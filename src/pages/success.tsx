import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '~/libs/stripe'

import { ImageContainer, SuccessContainer } from '~/styles/pages/success'

interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}
export default function Success({ customerName, product }: SuccessProps) {
  return (
    <SuccessContainer>
      <h1>Compra Efetuada</h1>

      <ImageContainer>
        <Image src={product.imageUrl} alt="" height={120} width={110} />
      </ImageContainer>

      <p>
        Uhuul <strong>{customerName}</strong>, sua{' '}
        <strong>{product.name}</strong>
        já está a caminho da sua casa.
      </p>

      <Link href="/">Voltar ao Catálogo</Link>
    </SuccessContainer>
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
  const product = session.line_items?.data[0].price?.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  }
}
