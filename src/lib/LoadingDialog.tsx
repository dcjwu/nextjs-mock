import React from "react"

import CircularProgress from "@mui/material/CircularProgress"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"

type LoadingDialogType = {
   isLoading: boolean
}

export const LoadingDialog: React.FC<LoadingDialogType> = ({ isLoading }): JSX.Element => {
   return (
      <Dialog open={isLoading}>
         <DialogContent>
            <CircularProgress color="info" />
         </DialogContent>
      </Dialog>
   )
}
