import { createRouter } from "next-connect"

import { adminMiddleware } from "@middlewares/admin.middleware"
import { prisma } from "@services/prisma"

import type { IUser } from "@interfaces/user.interface"
import type { NextApiRequest, NextApiResponse } from "next"

const router = createRouter<NextApiRequest, NextApiResponse>()

//Joi validation
//Admin - modify user, delete user, create user, request password change for user
//Me - get me, modify me
//Password - forgot, change password

router
   .use(adminMiddleware)

   .get(async (req: NextApiRequest, res: NextApiResponse) => {
      try {
         const users: IUser[] = await prisma.user.findMany({
            select: {
               id: true,
               name: true,
               email: true
            }
         })
         return res.status(200).json(users)
         
      }
      catch (err) {
         if (err instanceof Error) return res.status(400).json(err.message)
         return res.status(500).end("Internal server error")
      }
   })

export default router.handler({
   onError: (err: unknown, req: NextApiRequest, res: NextApiResponse) => {
      console.error(err)
      res.status(500).end("Internal server error")
   },
   onNoMatch: (req, res) => {
      res.status(405).end("Method not allowed")
   }
})
