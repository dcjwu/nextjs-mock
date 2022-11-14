import Link from "next/link"

import { ImageUploader } from "@components/ImageUploader"

import type { NextPage } from "next"

const Home: NextPage = (): JSX.Element => {
   return (
      <>

         <ImageUploader/>
         
         <Link href="/images">
            <a>Check images</a>
         </Link>
         
      </>
   )
}

export default Home

