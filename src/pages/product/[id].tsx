import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'

import { stripe } from '~/libs/stripe'

import {
  ImageContainer,
  ProductContainer,
  ProductDetail,
} from '~/styles/pages/product'

import { useGlobalContext } from '~/contexts/globalContext'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number | null
    priceFormated: string
    description: string
    priceId: string
    currency: string
  }
}
export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  const { handleOpenSidebarCart } = useGlobalContext()
  const { addItem, cartDetails } = useShoppingCart()

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

  const alreadyInTheBag = !!cartDetails?.[product.id]?.quantity
  const handleAddItemOrOpenSidebar = () => {
    if (!alreadyInTheBag) {
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

          <button type="button" onClick={handleAddItemOrOpenSidebar}>
            {alreadyInTheBag ? 'Abrir Sacola' : 'Colocar na Sacola'}
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

  const priceFormated = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price || 0)

  const productFormated: ProductProps['product'] = {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    price: productPrice,
    priceFormated,
    description: product.description || '',
    priceId: (product.default_price as Stripe.Price).id,
    currency: (product.default_price as Stripe.Price).currency,
  }

  return {
    props: { product: productFormated },
    revalidate: 60 * 60 * 1,
  }
}
