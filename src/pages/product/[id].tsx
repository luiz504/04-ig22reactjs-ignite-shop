import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'

import { stripe } from '~/libs/stripe'

import {
  ImageContainer,
  ProductContainer,
  ProductDetail,
} from '~/styles/pages/product'

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
    image_url: product.images[0],
    price: priceFormatted,
    description: product.description,
  }

  return {
    props: { product: productFormated },
    revalidate: 60 * 60 * 1,
  }
}
interface ProductProps {
  product: {
    id: string
    name: string
    image_url: string
    price: number | null
    description: string
  }
}
export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  if (isFallback || !product) {
    return <div>Loading...</div>
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.image_url} height={480} width={520} alt="" />
      </ImageContainer>
      <ProductDetail>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button>Compre Agora</button>
      </ProductDetail>
    </ProductContainer>
  )
}
