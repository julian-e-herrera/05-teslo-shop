import NextAuth,{NextAuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github"

import Credentials from "next-auth/providers/credentials"
import { dbUsers } from "../../../database"



export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
   
    // ...add more providers here
        Credentials({
            name: 'Custom login',
            credentials: {
                email: { label: 'Correo', type: 'email', placeholder: 'correo@google.com' },
                password: { label: 'Password', type: 'password', placeholder: 'password' },
                
            },
            async authorize(credentials):Promise<any> {
                
                console.log(credentials)
                return await dbUsers.checkUserEmailPassword(credentials!.email,credentials!.password)
                //return { name:'cosito',email:'julixx@test.com',role:'client'}
            }
      }),
    ],
    //custom pages
  pages: {
    signIn:'/auth/login',
    newUser:'/auth/register'
  },


  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge:86400
  },



    //callbacks
    
callbacks: {
  async jwt({ token, account,user }) {
   
    if (account) {
        token.accessToken = account.access_token
        switch (account.type) {
            case 'oauth':
                token.user =  await dbUsers.oAuthToDbUser(user?.email||'',user?.name||'')
                break;
            case 'credentials':
                token.user = user
                break;
        }
    }
    return token
  },
  async session({ session, token, user }) {
     
    session.accessToken = token.accessToken as any
    session.user = token.user as any
    return session
  }
}

}
export default NextAuth(authOptions)
