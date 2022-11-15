import React from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { signIn } from "next-auth/react"

import { Form } from "@lib/Form"
import { Input } from "@lib/Input"
import { handleAuthError } from "@services/nextauth"

import type { initialStateType } from "@customTypes/common"
import type { LoginFormType } from "@customTypes/components"

const initialState = {
   email: "",
   password: ""
}

export const LoginForm: React.FC<LoginFormType> = ({ errorMessage }): JSX.Element => {

   const [isLoading, setIsLoading] = React.useState<boolean>(false)
   const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
   const [error, setError] = React.useState<string>(errorMessage)

   const handleFormSubmit = async (event: React.SyntheticEvent, formData: initialStateType): Promise<void> => {
      event.preventDefault()
      setIsLoading(true)
      const { email } = formData
      await signIn("email", {
         email,
         redirect: false
      })
         .then(res => {
            setIsLoading(false)
            if (!res) setError("Something went wrong, please contact admin")
            else if (res.error) setError(handleAuthError(res.error))
            else {
               setIsSuccess(true)
               setError("")
            }
         })
   }

   return (
      <Box sx={{
         height: "100vh",
         width: "100vw",
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         mt: 10
      }}>

         <Box sx={{
            pb: 1,
            textAlign: "center",
            position: "relative"
         }}>
            <Typography component="h1" variant="h4">
               Login
            </Typography>

            {error && <Typography color="error">
               {error}
            </Typography>}

            {isSuccess && <Typography color="success.main">
               Please, check your email
            </Typography>}

         </Box>

         <Form handleFormSubmit={handleFormSubmit} initialState={initialState} isLoading={isLoading}>
            <Input autoFocus fullWidth required
               autoComplete="email"
               disabled={isSuccess}
               id="email"
               label="Email Address"
               margin="dense"
               name="email"
               type="email"/>
            <Button fullWidth disabled={isSuccess} size="large"
               sx={{ mt: 2 }}
               type="submit" variant="contained">
               Submit
            </Button>
         </Form>

      </Box>
   )
}
