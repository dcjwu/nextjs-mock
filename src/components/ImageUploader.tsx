import React from "react"

import { useS3Upload } from "next-s3-upload"
import Image from "next/image"

export const ImageUploader: React.FC = (): JSX.Element => {

   const {
      uploadToS3,
      files
   } = useS3Upload()

   const [uploadedFiles, setUploadedFiles] = React.useState<FileList | null>(null)

   const handleGetFile = (event: React.SyntheticEvent): void => {
      const target = event.target as HTMLInputElement
      if (target.files) setUploadedFiles(target.files)
   }

   const handleUploadFile = async (): Promise<void> => {
      if (uploadedFiles?.length) {
         for (let index = 0; index < uploadedFiles?.length; index++) {
            const file = uploadedFiles[index]
            await uploadToS3(file)
               .then(res => {
                  console.warn(res, index, "RES")
               })
               .catch(err => {
                  console.warn(err.message, index, "ERR") //Access denied
               })
         }
      }
   }

   return (
      <div>
         <input multiple type="file" onChange={handleGetFile}/>
         <button type="button" onClick={handleUploadFile}>Upload to S3</button>

         <div style={{
            display: "flex",
            flexDirection: "column"
         }}>
            {uploadedFiles && [...uploadedFiles].map(file =>
               <Image key={file.name} alt="" height={300}
                  layout="fixed" objectFit="cover"
                  src={URL.createObjectURL(file)} width={300}/>
            )}
         </div>

         {files.map(file =>
            <h2 key={file.file.lastModified}>{file.progress}</h2>
         )}
      </div>
   )
}
