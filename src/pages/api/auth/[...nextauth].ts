import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const authOptions: NextAuthOptions = { 
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [CredentialsProvider({
        name: "Credentials",
        type: "credentials",
        credentials: {
            email : {
                label: "Email",
                type: "email",
                placeholder: "Email"
            },
            password: {
                label: "Password",
                type: "password",
                placeholder: "Password"
            }
        },
        async authorize(credentials) {
            const {email, password} = credentials as {
                email: string,
                password: string
            }
            const user : any = {
                id : 1,
                email : email,
                password : password
            }
            if (user) {
                return user;
            }else{
                return null;
            }
            // const res = await fetch("/api/auth/login", {
            //     method: "POST",
            //     body: JSON.stringify(credentials),
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // });
            // const user = await res.json();
            // if (user) {
            //     return user;
            // } else {
            //     return null;
            // }
        }
    })],
    callbacks:{
        jwt({token, account, profile,user}){
            if (account?.provider === "credentials") {
               token.email = user?.email
            }
            return token
        },
       async session({session, token} :any){
            if ("email" in token) {
                session.user.email = token.email
            }

            return session
        }
    }
 }

 export default NextAuth(authOptions);