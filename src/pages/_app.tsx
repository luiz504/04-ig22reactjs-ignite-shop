import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'

import { GlobalProvider } from '~/contexts/globalContext'

import { globalStyles } from '~/styles/global'
import { AppContainer } from '~/styles/pages/app'

globalStyles()

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <GlobalProvider>
      <CartProvider
        cartMode="checkout-session"
        stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string}
        currency="BRL"
        shouldPersist
      >
        <AppContainer>{getLayout(<Component {...pageProps} />)}</AppContainer>
      </CartProvider>
    </GlobalProvider>
  )
}
