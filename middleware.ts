import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

const secret = process.env.NEXTAUTH_SECRET

export const middleware = async (req: NextRequest): Promise<NextResponse> => {

   const { origin } = req.nextUrl
   const token = await getToken({
      req,
      secret
   })

   if (!token && req.url.includes("/admin")) return NextResponse.redirect(`${origin}/`)

   if (token && req.url.includes("/login")) return NextResponse.redirect(`${origin}/admin`)

   return NextResponse.next()
}
