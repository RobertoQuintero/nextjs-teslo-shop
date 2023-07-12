import { Box } from "@mui/material"
import Head from "next/head"

interface Props {
  children:JSX.Element | JSX.Element[]
  title: string
}

export const AuthLayout = ({children,title}:Props) => {
  return (
    <>
    <Head>
      <title>{title}</title>

    </Head>
    <main>
      <Box display='flex' justifyContent='center' alignItems='center' height='100vh' >
        {children}
      </Box>
    </main>
    </>
  )
}
