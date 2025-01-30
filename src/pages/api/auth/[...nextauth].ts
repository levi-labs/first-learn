import { signIn, signInWithGoogle } from "@/lib/firebasse/service";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
const authOptions: NextAuthOptions = { 
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
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
           
            try {
                const user = await signIn({email,password});
                if (user) {
                return user;
                }else{
                return null;
                }
            } catch (error) {
                throw error;
            }
                //if wanna generate custom user without database
                // const user : any = {
                //     id : 1,
                //     email : email,
                //     password : password
                // }
            
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
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || ""
    }),
],
    callbacks:{
        async jwt({token, account, profile,user}: any){
      
            if (account?.provider === "credentials") {
                console.log('lewat credential');

               token.email = user?.email
               token.name = user?.name
               token.role = user?.role
            }
            console.log('acocunt 2', account);
            
            if (account?.provider === "google") {
              
                
                const data = {
                    name : user?.name,
                    email : user?.email,
                    image : user?.image,
                    type : 'google'
                }
               await signInWithGoogle(data,(res:{status: boolean,message: string, data: any}) => {
                if (res.status) {
                    token.email = res.data.email
                    token.name = res.data.name
                    token.role = res.data.role
                    token.image = res.data.image
                }
               })
                
            }
            return token
        },
       async session({session, token} :any){
            if ("email" in token) {
                session.user.email = token.email
            }
            if ("name" in token) {
                session.user.name = token.name
            }
            if ("role" in token) {
                session.user.role = token.role
            }

            if ("image" in token) {
                session.user.image = token.image
            }

            return session
        }
    },
    //if you wanna customize page you can do it here or add pages
    pages:{
        signIn: "/auth/login"
    }
 }

 export default NextAuth(authOptions);