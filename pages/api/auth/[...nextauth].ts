import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcrypt"
import NextAuth, { NextAuthOptions, Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { prisma } from "@services/prisma"

const timeAlive = 15 * 60 // Session will be idle after 15min of inactivity

//TODO: Make proper error handling at least at ui when credentials are incorrect in any way

export const authOptions: NextAuthOptions = {
   adapter: PrismaAdapter(prisma),
   providers: [
      CredentialsProvider({
         name: "emailAndPassword",
         credentials: {
            email: {
               label: "Email", type: "email", "placeholder": "email@email.com" 
            },
            password: { label: "Password", type: "password" }
         },
         async authorize(credentials): Promise<User | null> {
            try {
               if (!credentials) return null

               const user = await prisma.user.findUnique({ where: { email: credentials.email } })
               if (!user) return null

               const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
               if (isPasswordCorrect) return user

               return null

            }
            catch (err) {
               return null
            }
         }
      })
   ],
   pages: {
      signIn: "/auth/login", error: "auth/login", signOut: "/auth/logout" 
   },
   session: {
      strategy: "jwt",
      maxAge: timeAlive
   },
   callbacks: {
      async redirect(data) {
         return data.baseUrl
      },
      async session({ session }): Promise<Session> {
         try {
            if (session.user.email) {
               const currentUser = await prisma.user.findUnique({ where: { email: session.user.email } })
               if (!currentUser) return session

               session.user.id = currentUser.id
               session.user.imageUrl = currentUser.imageUrl
               session.user.role = currentUser.role
               return session

            } return session

         }
         catch (err) {
            return session
         }
      }
   }
}

export default NextAuth(authOptions)
