// import { GoogleProvider } from 'next-auth/providers';
import GitHubProvider from "next-auth/providers/github";

    
export const authOptions ={
    providers:[
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "" ,
        })
    ] ,
    secret: process.env.JWT_SECRET || "secret" ,
    callbacks : {
        async session({ session, token }: { session: any, token: any }) {
            session.user.id = token.sub;
            return session;
        }
    }
}


