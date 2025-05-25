// import { GoogleProvider } from 'next-auth/providers';
import GitHubProvider from "next-auth/providers/github";
import db from "@repo/db/client";
    
export const authOptions ={
    providers:[
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


