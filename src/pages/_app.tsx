import '@/styles/globals.css'
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from '@clerk/themes';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps} appearance={{
      baseTheme: dark,
      variables: {
        colorPrimary: "#ff7ac6",
        colorBackground: "#181920",
        colorInputBackground: "#272935",
        baseTheme: dark
      },
      layout: {
        privacyPageUrl: "/privacy",
        termsPageUrl: "/tos",
      }
    }} >
      <Component {...pageProps} />
    </ClerkProvider>
  )
}
