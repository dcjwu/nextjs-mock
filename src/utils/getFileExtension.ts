export const getFileExtension = (filename: string): string => {
   const extension = filename.split(".").pop()

   if (!extension) throw new Error("Filename is not valid")
   return extension
}
