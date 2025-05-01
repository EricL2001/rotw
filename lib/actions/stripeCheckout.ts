'use server'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil'
})


// Determine the base URL dynamically based on the Vercel environment
let YOUR_BASE_URL: string;

if (process.env.VERCEL_URL) {
  // On Vercel Production or Aliased Deployments
  YOUR_BASE_URL = `https://${process.env.VERCEL_URL}`;
} else if (process.env.VERCEL_BRANCH_URL) {
  // On Vercel Preview Deployments
  YOUR_BASE_URL = `https://${process.env.VERCEL_BRANCH_URL}`;
} else {
  // Local development fallback
  // Use non-null assertion (!) if you *guarantee* NEXT_PUBLIC_BASE_URL is set locally
  // Or use a fallback string
  YOUR_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
}

// --- Now use YOUR_BASE_URL to create the Stripe checkout session ---



export async function createCheckoutSession(showTitle: string, price: number, quantity: number, priceId: string) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: showTitle,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: quantity,
        },
        {
          price: priceId,
          quantity: quantity,
        }
      ],
      mode: 'payment',
      success_url: `${YOUR_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_BASE_URL}/canceled`,
    })

    return { sessionId: session.id }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw new Error('Failed to create checkout session')
  }
}