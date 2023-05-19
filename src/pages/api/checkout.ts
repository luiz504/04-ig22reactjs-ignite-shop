import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '~/libs/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const priceID = 'price_1N97jOGEx1kNSXEBHcuBFFNh'
  const successUrl = `${process.env.NEXT_URL}/success`
  const cancelURL = `${process.env.NEXT_URL}`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelURL,
    mode: 'payment',
    line_items: [{ price: priceID, quantity: 1 }],
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
