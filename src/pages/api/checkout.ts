import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '~/libs/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { priceId } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!priceId) {
    return res.status(400).json({ error: 'Price not found' })
  }

  const successUrl = `${process.env.NEXT_URL}/success`
  const cancelURL = `${process.env.NEXT_URL}`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelURL,
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
