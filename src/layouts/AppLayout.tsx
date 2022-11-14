import React from "react"

import { useRouter } from "next/router"

import { Loading } from "@lib/Loading"

type AppLayoutType = {
   children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutType> = ({ children }): JSX.Element => {

   const router = useRouter()

   const [isLoading, setIsLoading] = React.useState<boolean>(false)

   React.useEffect(() => {
      const handleStart = (url: string): false | void => url !== router.asPath && setIsLoading(true)
      const handleComplete = (url: string): false | void => url === router.asPath && setIsLoading(false)

      router.events.on("routeChangeStart", handleStart)
      router.events.on("routeChangeComplete", handleComplete)
      router.events.on("routeChangeError", handleComplete)

      return () => {
         router.events.off("routeChangeStart", handleStart)
         router.events.off("routeChangeComplete", handleComplete)
         router.events.off("routeChangeError", handleComplete)
      }
   })

   return (
      <>

         {isLoading
            ? <Loading isOpen={isLoading}/>
            : children
         }

      </>
   )
}
