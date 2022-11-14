import React from "react"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"

import { FormContext } from "@context/form.context"
import { LoadingDialog } from "@lib/LoadingDialog"

import type { FormType } from "@customTypes/common"

export const Form: React.FC<FormType> = ({
   initialState,
   handleFormSubmit,
   isLoading,
   children
}): JSX.Element => {

   const [formData, setFormData] = React.useState(initialState)

   const handleFormChange = (event: React.SyntheticEvent): void => {
      const target = event.target as HTMLInputElement
      const {
         name,
         value
      } = target

      setFormData({
         ...formData,
         [name]: value
      })
   }

   return (
      <>

         <Container component="div" maxWidth="xs">
            <Box component="form" onSubmit={(event: React.FormEvent<HTMLDivElement>): void => handleFormSubmit(event, formData)}>

               <FormContext.Provider value={{
                  formData,
                  handleFormChange
               }}>
                  {children}
               </FormContext.Provider>

            </Box>
         </Container>

         {isLoading && <LoadingDialog isLoading={isLoading}/>}

      </>

   )
}
