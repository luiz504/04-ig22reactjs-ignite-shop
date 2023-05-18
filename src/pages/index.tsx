import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from '~/libs/stripe'

import { HomeContainer, Product } from '~/styles/pages/home'

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const productPrice = (product.default_price as Stripe.Price).unit_amount

    const price = productPrice !== null ? productPrice / 100 : null

    return {
      id: product.id,
      name: product.name,
      image_url: product.images[0],
      price,
    }
  })

  return { props: { products }, revalidate: 60 * 60 * 2 }
}

interface HomeProps {
  products: {
    id: string
    name: string
    image_url: string
    price: number | null
  }[]
}
export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  })

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

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Product
            key={product.id}
            className="keen-slider__slide"
            href="/product/1"
          >
            <Image src={product.image_url} width={520} height={480} alt="" />
            <footer>
              <strong>{product.name}</strong>
              <span> $ 79.90</span>
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
  )
}
