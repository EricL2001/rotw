// CACHE BUSTER v3 - 2025-05-30-15:30
import Stripe from 'stripe';
import { Resend } from 'resend';

// Initialize Stripe with your secret key (from environment variables)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-03-31.basil',
});

// Initialize Resend with your API key (from environment variables)
const resend = new Resend(process.env.RESEND_API_KEY);

// Function to handle POST requests
export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature');
  let event: Stripe.Event;

  if (!signature) {
    console.error('❌ Missing stripe-signature header');
    return new Response('No stripe-signature header', { status: 400 });
  }

  // Add logging for environment variables (without exposing secrets)
  console.log('🔍 Environment check:', {
    hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
    hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
    hasResendKey: !!process.env.RESEND_API_KEY,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV
  });

  try {
    const rawBody = await req.text();

    console.log('🔍 Webhook verification attempt:', {
      bodyLength: rawBody.length,
      signaturePresent: !!signature
    });

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

  // webhook handler
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
        return new Response(JSON.stringify({ received: true, message: 'No email to send' }), { status: 200 });
      }

      // Use the name, or fallback to the email username
      const firstName = purchaserName?.split(' ')[0] || purchaserEmail.split('@')[0];

      // ADD THIS LOG:
      console.log('📧 Email props being sent:', {
        firstName,
        showTitle,
        showDate,
        quantity,
        venue,
        purchaserEmail
      });

      // Check if we're in preview/staging environment
      const isPreview = process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV !== 'production';

      console.log('🔍 STEP 1: Preparing to send email with props:', {
        firstName: firstName || 'N/A',
        showTitle: showTitle || 'N/A',
        showDate: showDate || 'N/A',
        quantity: quantity || 'N/A',
        venue: venue || 'N/A',
        isPreview: isPreview
      });

      try {
        console.log('🔍 STEP 2: Sending email via Resend - FORCE REBUILD v2...');

        const { data, error } = await resend.emails.send({
          from: 'Tickets <notifications@tickets.recordsonthewall.co>',
          to: purchaserEmail,
          subject: `Your Tickets for ${showTitle || 'Your Event'}`,
          react: `<h1>Hello ${firstName}</h1><p>Show: ${showTitle}</p><p>Date: ${showDate}</p>`,
        });

        console.log('🔍 STEP 3: Resend response received');

        if (error) {
          console.error('❌ Resend email error:', error);
          return new Response(JSON.stringify({ received: true, emailSent: false, error: error.message }), { status: 200 });
        }

        console.log('✅ Email sent successfully via Resend:', data);
        return new Response(JSON.stringify({ received: true, emailSent: true }), { status: 200 });

      } catch (emailError: unknown) {
        const errorMessage = emailError instanceof Error ? emailError.message : String(emailError);
        console.error('❌ General error sending email:', errorMessage);
        console.error('❌ Full error object:', emailError);
        return new Response(JSON.stringify({
          received: true,
          emailSent: false,
          error: `Email sending failed: ${errorMessage}`
        }), { status: 200 });
      }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}