import { handleAuthError } from "@services/nextauth"

describe("NextAuth Error Handler", () => {

   it("Should return Verification text", () => {
      expect(handleAuthError("Verification")).toBe("Verification link has expired")
   })

   it("Should return AccessDenied text", () => {
      expect(handleAuthError("AccessDenied")).toBe("Invalid credentials")
   })

   it.todo("Should throw value not found error")

   it("Should throw unhandled error", () => {
      expect(() => handleAuthError("No-key")).toThrow("Unhandled error")
   })
})

export {}
