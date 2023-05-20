import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import axios from 'axios'

import { stripe } from '~/libs/stripe'

import {
  ImageContainer,
  ProductContainer,
  ProductDetail,
} from '~/styles/pages/product'
import { useState } from 'react'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number | null
    description: string
    defaultPriceId: string
  }
}
export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSections, setIsCreatingCheckoutSections] =
    useState(false)
  const { isFallback } = useRouter()

  if (isFallback) {
    return (
      <div
        style={{
          height: 656,
        }}
      >
        Loading....
      </div>
    )
  }

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSections(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl // external
    } catch (err) {
      // Connect with some observer tool like DataDog/Sentry
      setIsCreatingCheckoutSections(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }
  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} height={480} width={520} alt="" />
        </ImageContainer>

        <ProductDetail>
          <h1>{product.name}</h1>

          <span>{product.price}</span>

          <p>{product.description}</p>

          <button
            type="button"
            onClick={() => handleBuyProduct()}
            disabled={isCreatingCheckoutSections}
            data-loading={isCreatingCheckoutSections}
          >
            Colocar na Sacola
          </button>
        </ProductDetail>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id || ''

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const productPrice = (product.default_price as Stripe.Price).unit_amount
  const price = productPrice !== null ? productPrice / 100 : null

  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price || 0)

  const productFormated = {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    price: priceFormatted,
    description: product.description,
    defaultPriceId: (product.default_price as Stripe.Price).id,
  }

  return {
    props: { product: productFormated },
    revalidate: 60 * 60 * 1,
  }
}
