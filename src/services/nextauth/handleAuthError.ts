const nextAuthErrorMapping = new Map([
   ["Verification", "Verification link has expired"],
   ["AccessDenied", "Invalid credentials"]
])

export const handleAuthError = (error: string): string => {
   if (nextAuthErrorMapping.has(error)) {
      const value = nextAuthErrorMapping.get(error)
      if (!value) throw new Error("Value for this error is not found")
      return value
   }
   throw new Error("Unhandled error")
}
