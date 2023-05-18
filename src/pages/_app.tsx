import type { AppProps } from 'next/app'
import Image from 'next/image'

import logoFullSVG from '~/assets/logoFull.svg'

import { globalStyles } from '~/styles/global'
import { AppContainer, Header } from '~/styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContainer>
      <Header>
        <Image src={logoFullSVG} alt="" />
      </Header>
      <Component {...pageProps} />
    </AppContainer>
  )
}
