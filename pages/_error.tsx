import React from "react"

import { Typography } from "@mui/material"

import type { ErrorPageType } from "@customTypes/pages"
import type { NextPage } from "next"

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
            <Typography color="error" component="p" variant="h2">{serverErrorMessage}</Typography>}
      </>
   )
}

export default Error
