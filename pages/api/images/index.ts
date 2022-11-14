import { createRouter } from "next-connect"

import { s3 } from "@services/aws"

import type { IImage } from "@interfaces/image.interface"
import type { NextApiRequest, NextApiResponse } from "next"

const router = createRouter<NextApiRequest, NextApiResponse>()

   .get(async (req: NextApiRequest, res: NextApiResponse) => {
      s3.listObjects({
         Bucket: process.env.S3_UPLOAD_BUCKETS ?? "",
         Delimiter: "/uploads"
      }, (err, data) => {
         if (err) return res.status(400).end(err.message)

         if (data.Contents !== undefined) {
            const images: IImage[] = data.Contents.map(item => {

               return {
                  url: `${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.Key}`,
                  size: item.Size,
                  lastModified: item.LastModified
               }
            })
            return res.status(200).json(images)
         }

         return res.status(400).end("Something went wrong with S3")
      })
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

export const config = { api: { externalResolver: true } }
