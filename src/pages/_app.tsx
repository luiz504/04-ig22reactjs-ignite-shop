import type { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'

import { GlobalProvider } from '~/contexts/globalContext'

import Header from './components/Header'

import { globalStyles } from '~/styles/global'
import { AppContainer } from '~/styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <CartProvider
        cartMode="checkout-session"
        stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string}
        currency="BRL"
        shouldPersist
      >
        <AppContainer>
          <Header />
          <Component {...pageProps} />
        </AppContainer>
      </CartProvider>
    </GlobalProvider>
  )
}
