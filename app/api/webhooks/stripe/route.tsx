import Stripe from 'stripe';
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/emails/email-template'; // Import the EmailTemplate
import React from 'react';

// Initialize Stripe with your secret key (from environment variables)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-03-31.basil', // Use your desired API version
});

// Initialize Resend with your API key (from environment variables)
const resend = new Resend(process.env.RESEND_API_KEY);


// Function to handle POST requests
export async function POST(req: Request) { // Use standard Request object for App Router
  const signature = req.headers.get('stripe-signature'); // Access header differently
  let event: Stripe.Event;

  if (!signature) {
    console.error('❌ Missing stripe-signature header');
    return new Response('No stripe-signature header', { status: 400 });
  }

  // Add logging for environment variables (without exposing secrets)
  console.log('🔍 Environment check:', {
    hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
    hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
    hasResendKey: !!process.env.RESEND_API_KEY
  });

  try {
    // Read the raw body of the request for signature verification
    const rawBody = await req.text(); // Read raw body as text for signature verification

    // Add more detailed logging
    console.log('🔍 Webhook verification attempt:', {
      bodyLength: rawBody.length,
      signaturePresent: !!signature
    });

    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    console.log('✅ Webhook signature verified successfully');

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(`❌ Error verifying Stripe webhook signature: ${errorMessage}`);
    return new Response(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;

      console.log('✅ Checkout session completed:', session.id);

      // Get metadata from the session
      const { showTitle, showDate, quantity, venue } = session.metadata || {};

      // Get purchaser's email and name from Stripe checkout session
      const purchaserEmail = session.customer_details?.email;
      const purchaserName = session.customer_details?.name;

      if (!purchaserEmail) {
        console.warn('⚠️ No customer email found in session metadata. Cannot send email.');
        // Return 200 even if email can't be sent, as webhook was handled
        return new Response(JSON.stringify({ received: true, message: 'No email to send' }), { status: 200 });
      }

      // Use the name, or fallback to the email username
      const firstName = purchaserName?.split(' ')[0] || purchaserEmail.split('@')[0];

      // ---- ADD THIS LOG ----
      console.log('[Vercel Webhook] showDate from metadata before sending to EmailTemplate:', showDate);

      try {
        const { data, error } = await resend.emails.send({
          from: 'Tickets <notifications@tickets.recordsonthewall.co>',
          to: purchaserEmail,
          subject: `Your Tickets for ${showTitle || 'Your Event'}`,
          react: <EmailTemplate
            firstName={firstName || 'N/A'}
            showTitle={showTitle || 'N/A'}
            showDate={showDate || 'N/A'}
            quantity={quantity || 'N/A'}
            venue={venue || 'N/A'}
          />,
        });

        if (error) {
          console.error('❌ Resend email error:', error);
          // Don't return non-200 to Stripe, as the webhook was processed; only email failed.
          return new Response(JSON.stringify({ received: true, emailSent: false, error: error.message }), { status: 200 });
        }

        console.log('✅ Email sent successfully via Resend:', data);
        return new Response(JSON.stringify({ received: true, emailSent: true }), { status: 200 });

      } catch (emailError: unknown) {
        console.error('❌ General error sending email:', emailError);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 }); // Indicate internal server error
      }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Always return a 200 response to acknowledge receipt of the event
  // Stripe will retry if it doesn't receive a 200 OK.
  return new Response(JSON.stringify({ received: true }), { status: 200 });
}