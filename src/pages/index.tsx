import Head from 'next/head'
import { Roboto } from 'next/font/google'
import { styled } from '~/styles'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['500', '900'],
  fallback: ['sanserif'],
})

const Button = styled('button', {
  backgroundColor: '$rocketseat',
  borderRadius: 4,
  transition: 'filter 150ms',
  '&:hover': {
    filter: 'brightness(0.8)',
  },
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Ignite Shop</title>
        <meta
          name="description"
          content="04 Ignite ReactJs, NextJs Fundamentals"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${roboto.className}`}>
        Hello word
        <Button>Hello</Button>
      </main>
    </>
  )
}
