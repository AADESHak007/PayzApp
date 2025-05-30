// import { GoogleProvider } from 'next-auth/providers';
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@repo/db/client";
    
export const authOptions ={
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "merchant@email.com" },
                name: { label: "Name", type: "text", placeholder: "Merchant Name", required: false },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
                if (!credentials?.email || !credentials?.password) return null;
                const merchant = await db.merchant.findUnique({
                    where: { email: credentials.email },
                });
                if (merchant && merchant.password) {
                    const isValid = await bcrypt.compare(credentials.password, merchant.password);
                    if (isValid) {
                        return {
                            id: merchant.id.toString(),
                            name: merchant.name,
                            email: merchant.email
                        };
                    }
                }
                // Register new merchant if not found
                if (credentials.name) {
                    const hashedPassword = await bcrypt.hash(credentials.password, 10);
                    const newMerchant = await db.merchant.create({
                        data: {
                            email: credentials.email,
                            name: credentials.name,
                            password: hashedPassword,
                            MerchantBalance: {
                                create: {
                                    amount: 20000,
                                    locked: 0
                                }
                            }
                        }
                    });
                    return {
                        id: newMerchant.id.toString(),
                        name: newMerchant.name,
                        email: newMerchant.email
                    };
                }
                return null;
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "" ,
        })
    ] ,
    secret: process.env.JWT_SECRET || "secret" ,
    callbacks: {
        async session({ session , token }: any) {
          session.user.id = token.sub;
          return session;
        },
        async signIn({ user, account, profile }: any) {
          // Check if user exists in your DB, if not, create them
          const existingUser = await db.merchant.findUnique({
            where: { email: user.email },
          });
          if (!existingUser) {
            await db.merchant.create({
              data: {
                email: user.email,
                name: user.name,
                MerchantBalance : {
                  create:{
                    amount: 2000,
                    locked: 0,
                  }
                }
                // add other fields as needed
              },
            });
          }
          return true;
        }
      }
}


