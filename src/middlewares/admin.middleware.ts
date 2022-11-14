import { getToken } from "next-auth/jwt"

import { prisma } from "@services/prisma"

import type { NextApiRequest, NextApiResponse } from "next"
import type { NextHandler } from "next-connect"

const secret = process.env.NEXTAUTH_SECRET

export const adminMiddleware = async (req: NextApiRequest, res: NextApiResponse, next: NextHandler): Promise<NextApiResponse | Promise<void>> => {
   const token = await getToken({
      req,
      secret
   })
   
   if (!token) return res.status(401).end("Unauthorized")
   
   const user = await prisma.user.findUnique({ where: { id: token.sub } })

   if (!user) return res.status(401).end("Unauthorized")

   if (user.role !== "ADMIN") return res.status(403).end("Forbidden")

   next()
}
