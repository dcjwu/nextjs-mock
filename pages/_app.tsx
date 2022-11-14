import { CssBaseline } from "@mui/material"
import { SessionProvider } from "next-auth/react"

import { AppLayout } from "@layouts/AppLayout"

import type { Session } from "next-auth"
import type { AppProps } from "next/app"

const App = ({
   Component,
   pageProps
}: AppProps<{session: Session}>): JSX.Element => {
   return <>
      <CssBaseline/>
      
      <AppLayout>
         <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
         </SessionProvider>
      </AppLayout>
   </>
}

export default App
