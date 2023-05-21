/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '~/libs/stripe'

export interface CreateCheckoutRequestBody {
  line_items: { price_id: string; quantity: number }[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { line_items } = req.body as CreateCheckoutRequestBody

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (
    !Array.isArray(line_items) ||
    !line_items.length ||
    !!line_items.some((item) => !item.price_id || !item.quantity)
  ) {
    return res
      .status(400)
      .json({ error: 'Price not found or product with quantity 0' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelURL = `${process.env.NEXT_URL}`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelURL,
    mode: 'payment',
    line_items: line_items.map((i) => ({
      price: i.price_id,
      quantity: i.quantity,
    })),
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
