import { Handbag } from '@phosphor-icons/react'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import Link from 'next/link'

import logoFullSVG from '~/assets/logoFull.svg'

import SidebarCart from './components/SidebarCart'

import { globalStyles } from '~/styles/global'
import { AppContainer, CartBtn, Header } from '~/styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const count: number = 1
  return (
    <AppContainer>
      <Header>
        <Link href={'/'}>
          <Image role="button" src={logoFullSVG} alt="" />
        </Link>

        <SidebarCart>
          <CartBtn hasProduct={!!count} type="button">
            <Handbag size={24} weight="bold" />
            <span>{count}</span>
          </CartBtn>
        </SidebarCart>
      </Header>
      <Component {...pageProps} />
    </AppContainer>
  )
}
