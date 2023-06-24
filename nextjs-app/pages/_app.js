import { ChakraProvider, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react';
import { GoogleAnalytics } from "nextjs-google-analytics";
import { SessionProvider } from "next-auth/react"

import theme from '../styles/theme.js'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');

  React.useEffect(() => {
    if (text === 'dark') {
        toggleColorMode
    }
  }, [text])

  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <GoogleAnalytics trackPageViews />
        <Component {...pageProps} />
        </SessionProvider>
    </ChakraProvider>
  )
}
