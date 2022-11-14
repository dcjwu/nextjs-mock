import { APIRoute } from "next-s3-upload"

import { getUuid } from "@services/uuid"

export default APIRoute.configure({
   key(req, filename) {
      const extension = filename.split(".").pop()
      return `uploads/${getUuid()}.${extension}`
   }
})
