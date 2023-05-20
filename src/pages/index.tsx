import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from '~/libs/stripe'

import { HomeContainer, Product } from '~/styles/pages/home'
import { Handbag } from '@phosphor-icons/react'

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
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Product
            href={`/product/${product.id}`}
            key={product.id}
            className="keen-slider__slide"
            prefetch={false}
          >
            <Image src={product.image_url} width={520} height={480} alt="" />

            <footer>
              <div>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </div>

              <button type="button">
                <Handbag size={32} weight="bold" />
              </button>
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const productPrice = (product.default_price as Stripe.Price).unit_amount

    const price = productPrice !== null ? productPrice / 100 : null

    const priceFormatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price || 0)

    return {
      id: product.id,
      name: product.name,
      image_url: product.images[0],
      price: priceFormatted,
    }
  })

  return { props: { products }, revalidate: 60 * 60 * 2 }
}
