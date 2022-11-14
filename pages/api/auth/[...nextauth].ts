import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { NextAuthOptions, Session } from "next-auth"
import EmailProvider from "next-auth/providers/email"

import { prisma } from "@services/prisma"

const timeAlive = 15 * 60 // Session will be idle after 15min of inactivity

//TODO: Make proper error handling at least at ui when credentials are incorrect in any way

export const authOptions: NextAuthOptions = {
   adapter: PrismaAdapter(prisma),
   providers: [
      EmailProvider({
         server: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: {
               user: process.env.SMTP_USER,
               pass: process.env.SMTP_PASSWORD
            }
         },
         from: process.env.SMTP_FROM
      })
   ],
   pages: {
      signIn: "/login",
      error: "/login"
   },
   callbacks: {
      /**
       * Throws an error if user not found in a database
       * @param user - Current User object
       */
      async signIn({ user }) {
         if (user.email) {
            const currentUser = await prisma.user.findUnique({ where: { email: user.email } })
            if (!currentUser) return false
         }

         return true
      },
      /**
       * Returns modified session
       * @param session - NextAuth Session object
       */
      async session({ session }): Promise<Session> {
         if (session.user?.email) {
            const currentUser = await prisma.user.findUnique({ where: { email: session.user.email } })
            if (!currentUser) return session
            
            session.user.id = currentUser.id
            session.user.imageUrl = currentUser.imageUrl
            session.user.role = currentUser.role
            return session
         }

         else return session
      }
   },
   session: {
      strategy: "jwt",
      maxAge: timeAlive
   },
   secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
