import React from "react"

import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"

type LoadingType = {
   isOpen: boolean
}

export const Loading: React.FC<LoadingType> = ({ isOpen }): JSX.Element => {
   return (
      <Backdrop open={isOpen}
         sx={{
            color: "#fff", zIndex: (theme): number => theme.zIndex.drawer + 1, flexDirection: "column", gap: "10px" 
         }}
      >
         <CircularProgress color="inherit" />
         <Typography component="p" variant="subtitle1">Loading...</Typography>
      </Backdrop>
   )
}
