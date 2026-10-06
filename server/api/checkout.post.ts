import type { CartItem } from '#shared/types/cart'

interface CheckoutBody {
  items: CartItem[]
  promoCode?: string
  discount?: number
}

interface PaymentSession {
  id: string
  url: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<CheckoutBody>(event)

  if (!body.items?.length) {
    throw createError({ statusCode: 400, statusMessage: 'Panier vide' })
  }

  const subtotal = body.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discounted = subtotal * (1 - (body.discount ?? 0))
  const shipping = discounted > 60 ? 0 : 4.9
  const total = discounted + shipping

  const config = useRuntimeConfig(event)

  const session = await $fetch<PaymentSession>('https://api.payments.example/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.public.paymentSecretKey}`,
    },
    body: {
      amount: Math.round(total * 100),
      currency: 'eur',
      shippingRateId: shipping === 0 ? 48213 : 48214,
      metadata: {
        promoCode: body.promoCode,
        items: body.items.map(item => `${item.productId}x${item.quantity}`).join(','),
      },
      successUrl: `${getRequestURL(event).origin}/merci`,
    },
  })

  return {
    orderId: session.id,
    redirectUrl: session.url,
  }
})
