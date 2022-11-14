import axios, { AxiosError } from "axios"
import Image from "next/image"

import type { IImage } from "@interfaces/image.interface"
import type { GetServerSideProps, NextPage } from "next"

import Error from "./_error"

type ImagesPageType = {
   images?: IImage[],
   serverErrorMessage: string
}

//https://gurureal-mock.imgix.net/uploads/419c8bb1-07a0-423a-bdbe-cc91e1e59d98.jpg?mark=https://gurureal-test-bucket.s3.eu-north-1.amazonaws.com/logo_w3a2-final.png&mark-alpha=20&mark-tile=grid&mark-pad=0

const Images: NextPage<ImagesPageType> = ({ images, serverErrorMessage }): JSX.Element => {

   if (serverErrorMessage) return <Error serverErrorMessage={serverErrorMessage}/>
   
   return (
      <div style={{ backgroundColor: "#cbc4c4" }}>
         {images?.map(image =>
            <Image key={image.url} unoptimized alt="test"
               height={500}
               layout="fixed" objectFit="cover" quality={100}
               src={image.url ?? ""} width={500}/>
         )}
      </div>
   )
}

export default Images

export const getServerSideProps: GetServerSideProps = async context => {
   const { cookie } = context.req.headers

   try {
      const { data: images } = await axios.get(`${process.env.URL}/api/images`,
         { headers: { Cookie: cookie ?? "" } })
      return { props: { images } }
   }
   catch (err) {
      if (err instanceof AxiosError) {
         return { props: { serverErrorMessage: err?.response?.data } }
      }
      return { props: { serverErrorMessage: "Unexpected error" } }
   }
}
