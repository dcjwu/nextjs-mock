import { getToken } from "next-auth/jwt"

import type { NextApiRequest, NextApiResponse } from "next"
import type { NextHandler } from "next-connect"

const secret = process.env.NEXTAUTH_SECRET

export const authMiddleware = async (req: NextApiRequest, res: NextApiResponse, next: NextHandler): Promise<NextApiResponse | Promise<void>> => {
   const token = await getToken({
      req,
      secret
   })
   
   if (!token) return res.status(401).end("Unauthorized")
   
   next()
}
