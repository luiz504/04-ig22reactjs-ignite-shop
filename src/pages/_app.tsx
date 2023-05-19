import type { AppProps } from 'next/app'
import Image from 'next/image'

import { useRouter } from 'next/router'

import logoFullSVG from '~/assets/logoFull.svg'

import { globalStyles } from '~/styles/global'
import { AppContainer, Header } from '~/styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <AppContainer>
      <Header>
        <Image
          role="button"
          src={logoFullSVG}
          alt=""
          onClick={() => router.back()}
        />
      </Header>
      <Component {...pageProps} />
    </AppContainer>
  )
}
