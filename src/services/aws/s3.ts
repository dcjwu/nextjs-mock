import { S3 } from "aws-sdk"

export const s3 = new S3({
   region: process.env.S3_UPLOAD_REGION,
   accessKeyId: process.env.S3_UPLOAD_KEY,
   secretAccessKey: process.env.S3_UPLOAD_SECRET,
   signatureVersion: "v4"
})
