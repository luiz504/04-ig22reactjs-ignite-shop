import { GetServerSideProps } from 'next'
import Head from 'next/head'

import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '~/libs/stripe'

import { NextPageWithLayout } from './_app'
import SecondaryLayout from './layouts/SecondaryLayout'

import {
  ImageContainer,
  ImagesRow,
  SuccessContainer,
} from '~/styles/pages/success'
import { useEffect } from 'react'
import { useShoppingCart } from 'use-shopping-cart'

type Product = { id: string; name: string; imageUrl: string; quantity: number }
interface SuccessProps {
  customerName: string
  products: Product[]
}
const Success: NextPageWithLayout<SuccessProps> = ({
  customerName,
  products,
}) => {
  const amountOfProducts = products.reduce((acu, cur) => {
    return acu + cur.quantity
  }, 0)

  const { clearCart } = useShoppingCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <>
      <Head>
        <title>Compra Efeturada | Ignite Shop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImagesRow>
          {products.map((product) => (
            <ImageContainer key={product.id}>
              <Image
                src={product.imageUrl}
                draggable={false}
                alt=""
                height={120}
                width={110}
              />
            </ImageContainer>
          ))}
        </ImagesRow>

        <h1>Compra Efetuada</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{' '}
          {amountOfProducts} camisetas já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao Catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const sessionId = query.session_id as string

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'customer_details', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name

  const products: Product[] = (
    session.line_items?.data as Stripe.LineItem[]
  ).map((item) => {
    const product = item.price?.product as Stripe.Product
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      quantity: item.quantity || 0,
    }
  })

  return {
    props: {
      customerName,
      products,
    },
  }
}

Success.getLayout = (page) => {
  return <SecondaryLayout>{page}</SecondaryLayout>
}

export default Success
