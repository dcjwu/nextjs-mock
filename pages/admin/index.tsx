import { signOut } from "next-auth/react"
import Link from "next/link"

import { ImageUploader } from "@components/ImageUploader"

import type { NextPage } from "next"

const Home: NextPage = (): JSX.Element => {

   const handleLogout = async (): Promise<void> => {
      await signOut()
   }

   return (
      <>

         <ImageUploader/>
         
         <Link href="admin/images">
            <a>Check images</a>
         </Link>
         
         <button onClick={handleLogout}>sign out</button>
         
      </>
   )
}

export default Home

