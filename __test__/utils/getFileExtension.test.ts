import { getFileExtension } from "@utils/getFileExtension"

describe("Get File Extension", () => {
   
   it("Should return file extension", () => {
      expect(getFileExtension("file.pdf")).toBe("pdf")
   })

   it("Should throw an error", () => {
      expect(() => getFileExtension("")).toThrow("Filename is not valid")
   })
})

export {}
