import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from '~/libs/stripe'

import { CartHandlerBtn, HomeContainer, Product } from '~/styles/pages/home'
import { Handbag } from '@phosphor-icons/react'
import Link from 'next/link'
import { useGlobalContext } from '~/contexts/globalContext'

type ProductType = {
  id: string
  name: string
  imageUrl: string
  price: number | null
  priceFormatted: string
  currency: string
  priceId: string
}
interface HomeProps {
  products: ProductType[]
}
export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  const { handleOpenSidebarCart } = useGlobalContext()

  const { addItem, cartDetails } = useShoppingCart()

  const handleClickProductBag = (product: ProductType) => {
    const alredyInTheBag = !!cartDetails?.[product.id]?.quantity
    if (!alredyInTheBag) {
      addItem({
        id: product.id,
        name: product.name,
        currency: product.currency,
        image: product.imageUrl,
        price: product.price || 0,
        price_id: product.priceId,
      })
    } else {
      handleOpenSidebarCart(true)
    }
  }
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Product key={product.id} className="keen-slider__slide">
            <Link href={`/product/${product.id}`} prefetch={false}>
              <Image src={product.imageUrl} width={520} height={480} alt="" />
            </Link>

            <footer>
              <div>
                <strong>{product.name}</strong>
                <span>{product.priceFormatted}</span>
              </div>

              <CartHandlerBtn
                type="button"
                addedToTheBag={!!cartDetails?.[product.id]?.quantity}
                onClick={() => handleClickProductBag(product)}
              >
                <Handbag size={32} weight="bold" />
                <span>{cartDetails?.[product.id]?.quantity}</span>
              </CartHandlerBtn>
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

  const products = response.data.map((prod) => {
    const productPrice = (prod.default_price as Stripe.Price).unit_amount

    const price = productPrice ? productPrice / 100 : 0

    const priceFormatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price || 0)

    const product: ProductType = {
      id: prod.id,
      name: prod.name,
      imageUrl: prod.images[0],
      price: productPrice,
      priceFormatted,
      currency: (prod.default_price as Stripe.Price)?.currency,
      priceId: (prod.default_price as Stripe.Price)?.id,
    }

    return product
  })

  return { props: { products }, revalidate: 60 * 60 * 2 }
}
