import { APIRoute } from "next-s3-upload"

import { getUuid } from "@services/uuid"
import { getFileExtension } from "@utils/getFileExtension"

export default APIRoute.configure({
   key(req, filename) {
      return `uploads/${getUuid()}.${getFileExtension(filename)}`
   }
})
