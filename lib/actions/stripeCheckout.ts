'use server'

import Stripe from 'stripe'
import { toZonedTime, format } from 'date-fns-tz';

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

//console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
//console.log('VERCEL_URL:', process.env.VERCEL_URL);
//console.log('VERCEL_BRANCH_URL:', process.env.VERCEL_BRANCH_URL);
//console.log('NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);


export async function createCheckoutSession(
  showTitle: string,
  price: number,
  dosPrice: number,
  quantity: number,
  showDate?: string,
  venue?: string,
  show_id?: string
) {


  // Helper to compare only year, month, day (ignoring time)
  function isSameDayInZoneString(dateA: Date, dateB: Date, timeZone: string) {
    const a = format(toZonedTime(dateA, timeZone), 'yyyy-MM-dd');
    const b = format(toZonedTime(dateB, timeZone), 'yyyy-MM-dd');
    return a === b;
  }


  try {
    let useDos = false;

    if (showDate) {
      const today = new Date();
      // showDate is expected as 'yyyy-MM-dd'
      const show = new Date(`${showDate}T00:00:00-05:00`); // force NY time
      useDos = isSameDayInZoneString(today, show, 'America/New_York');
    }


    const ticketPrice = useDos ? dosPrice : price;
    const subtotalCents = Math.round(ticketPrice * 100) * quantity;
    const salesTaxCents = Math.round(subtotalCents * 0.0725);
    const ticketFeePerTicket = ticketPrice < 10 ? 100 : 350;
    const ticketFeeTotal = ticketFeePerTicket * quantity;
    const checkoutTotal = subtotalCents + ticketFeeTotal + salesTaxCents;


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: showTitle,
            },
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
      payment_intent_data: {
        description: showTitle, // <-- This sets the dashboard Description
      },
      metadata: {
        show_id: show_id || '',
        showTitle: showTitle,
        showDate: showDate || '',
        quantity: quantity.toString(),
        venue: venue || '',
        ticketPrice: (ticketPrice * 100).toString(), // Convert to cents for metadata
        isDayOfShow: useDos.toString(),
        ticketPriceTotal: subtotalCents.toString(),
        checkoutTotal: checkoutTotal.toString(),
        taxTotal: salesTaxCents.toString(),
        ticketFeeTotal: ticketFeeTotal.toString(),
      },
      customer_creation: 'always', // double check this setup
    });

    return { sessionId: session.id }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw new Error('Failed to create checkout session')
  }
}