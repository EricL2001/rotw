'use server'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil'
})


// Determine the base URL dynamically based on the Vercel environment
let BASE_URL: string;

if (process.env.VERCEL_URL) {
  // On Vercel Production or Aliased Deployments
  BASE_URL = `https://${process.env.VERCEL_URL}`;
} else if (process.env.VERCEL_BRANCH_URL) {
  // On Vercel Preview Deployments
  BASE_URL = `https://${process.env.VERCEL_BRANCH_URL}`;
} else {
  // Local development fallback
  // Use non-null assertion (!) if you *guarantee* NEXT_PUBLIC_BASE_URL is set locally
  // Or use a fallback string
  BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
}

// --- Now use YOUR_BASE_URL to create the Stripe checkout session ---

// Add this at the top of your file to debug
//console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
//console.log('VERCEL_URL:', process.env.VERCEL_URL);
//console.log('VERCEL_BRANCH_URL:', process.env.VERCEL_BRANCH_URL);
//console.log('NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);


export async function createCheckoutSession(
  showTitle: string,
  price: number,
  dosPrice: number,
  quantity: number,
  showDate?: string
) {
  console.log('DEBUG: args', { showTitle, price, dosPrice, quantity, showDate });

  // Helper to compare only year, month, day (ignoring time)
  function isSameDay(dateA: Date, dateB: Date) {
    return (
      dateA.getFullYear() === dateB.getFullYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDate() === dateB.getDate()
    );
  }

  try {
    let useDos = false;

    if (showDate) {
      const today = new Date();
      const show = new Date(showDate); // works for both ISO and 'YYYY-MM-DD'
      useDos = isSameDay(today, show);
    }

    const ticketPrice = useDos ? dosPrice : price;
    const subtotalCents = Math.round(ticketPrice * 100) * quantity;
    const salesTaxCents = Math.round(subtotalCents * 0.0725);

    // console.log('DEBUG: ticketPrice:', ticketPrice);
    // console.log('DEBUG: subtotalCents:', subtotalCents);
    // console.log('DEBUG: salesTaxCents:', salesTaxCents);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: showTitle },
            unit_amount: Math.round(ticketPrice * 100),
          },
          quantity,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Ticket Fee' },
            unit_amount: ticketPrice < 10 ? 100 : 350,
          },
          quantity,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Sales Tax (7.25%)' },
            unit_amount: salesTaxCents,
          },
          quantity: 1,
        }
      ],
      mode: 'payment',
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/canceled`,
    });

    console.log('DEBUG: Stripe session created:', session.id);

    return { sessionId: session.id }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw new Error('Failed to create checkout session')
  }
}