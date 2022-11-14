import React from "react"

import type { NextPage } from "next"

export type ErrorPageType = {
   serverErrorMessage: string
}

const Error: NextPage<ErrorPageType> = ({ serverErrorMessage }): JSX.Element => {

   const [isDisplay, setIsDisplay] = React.useState<boolean>(false)

   /**
    * Required to prevent hydration error
    */
   React.useEffect(() => {
      setIsDisplay(true)
   }, [])

   return (
      <>
         {isDisplay &&
            <h1>{serverErrorMessage}</h1>}
      </>
   )
}

export default Error
