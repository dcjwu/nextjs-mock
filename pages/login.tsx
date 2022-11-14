import dynamic from "next/dynamic"
import Head from "next/head"

import { Loading } from "@lib/Loading"
import { handleAuthError } from "@services/nextauth"

import type { ErrorMessageType } from "@customTypes/common"
import type { GetServerSideProps, NextPage } from "next"

const LoginForm = dynamic(() => import("@components/LoginForm").then(module => module.LoginForm),
   { loading: () => <Loading isOpen/> })

const LoginPage: NextPage<{ errorMessage: ErrorMessageType }> = ({ errorMessage }): JSX.Element => {

   return <>
      <Head>
         <title>Login</title>
      </Head>

      <LoginForm errorMessage={errorMessage}/>
   </>
}

export default LoginPage

export const getServerSideProps: GetServerSideProps = async context => {
   const { query } = context

   if (query.error && typeof query.error === "string") {
      const errorText = handleAuthError(query.error)
      return { props: { errorMessage: errorText } }
   }

   return { props: {} }
}
