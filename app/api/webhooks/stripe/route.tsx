// import Stripe from 'stripe';
// import { Resend } from 'resend';
// import { render } from '@react-email/render';
// import { EmailTemplate } from '@/components/emails/email-template';
// import { neon } from '@neondatabase/serverless';

// // Initialize Stripe with your secret key (from environment variables)
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: '2025-03-31.basil',
// });

// // Initialize Resend with your API key (from environment variables)
// const resend = new Resend(process.env.RESEND_API_KEY);

// // Initialize Neon client for database operations
// const sql = neon(process.env.DATABASE_URL!);


// // Function to insert payment record into database
// async function insertPaymentRecord(session: Stripe.Checkout.Session) {
//   try {
//     const metadata = session.metadata || {};

//     // console.log('🔍 Raw metadata from Stripe:', JSON.stringify(metadata, null, 2));

//     const paymentData = {
//       show_id: metadata.show_id || '',
//       show_title: metadata.showTitle || '',
//       venue: metadata.venue || '',
//       show_date: metadata.showDate || '',
//       ticket_price: parseFloat(metadata.ticketPrice || '0') / 100,
//       is_dos_price: metadata.isDayOfShow === 'true',
//       ticket_quantity: parseInt(metadata.quantity || '1'),
//       total_ticket_price: parseFloat(metadata.ticketPriceTotal || '0') / 100,
//       customer_name: session.customer_details?.name || '',
//       customer_email: session.customer_details?.email || '',
//       total_amount_paid: parseFloat(metadata.checkoutTotal || '0') / 100,
//       tax_total: parseFloat(metadata.taxTotal || '0') / 100,
//       fee_amount: parseFloat(metadata.ticketFeeTotal || '0') / 100,
//       stripe_payment_id: session.payment_intent as string,
//     };

//     const result = await sql`
//       INSERT INTO show_payments_final (
//         show_id, show_title, venue, show_date, ticket_price,
//         is_dos_price, ticket_quantity, total_ticket_price,
//         customer_name, customer_email, total_amount_paid,
//         tax_total, fee_amount, stripe_payment_id
//       ) VALUES (
//         ${paymentData.show_id}, ${paymentData.show_title}, ${paymentData.venue}, 
//         ${paymentData.show_date}, ${paymentData.ticket_price}, ${paymentData.is_dos_price},
//         ${paymentData.ticket_quantity}, ${paymentData.total_ticket_price},
//         ${paymentData.customer_name}, ${paymentData.customer_email}, 
//         ${paymentData.total_amount_paid}, ${paymentData.tax_total}, 
//         ${paymentData.fee_amount}, 
//         ${paymentData.stripe_payment_id}
//       )
//     `;

//     console.log('✅ Payment record inserted successfully:', result);
//     return true;
//   } catch (error) {
//     console.error('❌ Error inserting payment record:', error);
//     return false;
//   }
// }


// // Function to handle POST requests
// export async function POST(req: Request) {
//   const signature = req.headers.get('stripe-signature');
//   let event: Stripe.Event;

//   if (!signature) {
//     console.error('❌ Missing stripe-signature header');
//     return new Response('No stripe-signature header', { status: 400 });
//   }

//   // Add logging for environment variables (without exposing secrets)
//   // console.log('🔍 Environment check:', {
//   //   hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
//   //   hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
//   //   hasResendKey: !!process.env.RESEND_API_KEY,
//   //   nodeEnv: process.env.NODE_ENV,
//   //   vercelEnv: process.env.VERCEL_ENV
//   // });

//   try {
//     const rawBody = await req.text();

//     // console.log('🔍 Webhook verification attempt:', {
//     //   bodyLength: rawBody.length,
//     //   signaturePresent: !!signature
//     // });

//     event = stripe.webhooks.constructEvent(
//       rawBody,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET as string
//     );
//     console.log('✅ Webhook signature verified successfully');

//   } catch (err: unknown) {
//     const errorMessage = err instanceof Error ? err.message : String(err);
//     console.error(`❌ Error verifying Stripe webhook signature: ${errorMessage}`);
//     return new Response(`Webhook Error: ${errorMessage}`, { status: 400 });
//   }

//   // webhook handler
//   switch (event.type) {
//     case 'checkout.session.completed':
//       const session = event.data.object as Stripe.Checkout.Session;

//      // console.log('✅ Checkout session completed:', session.id);

//       // Get metadata from the session
//       const { showTitle, showDate, quantity, venue } = session.metadata || {};

//       // Get purchaser's email and name from Stripe checkout session
//       const purchaserEmail = session.customer_details?.email;
//       const purchaserName = session.customer_details?.name;

//       if (!purchaserEmail) {
//         console.warn('⚠️ No customer email found in session metadata. Cannot send email.');
//         return new Response(JSON.stringify({ received: true, message: 'No email to send' }), { status: 200 });
//       }

//       // Use the name, or fallback to the email username
//       const firstName = purchaserName?.split(' ')[0] || purchaserEmail.split('@')[0];


//       // Check if we're in preview/staging environment
//       const isPreview = process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV !== 'production';


//       try {

//         const emailText = `Hi ${firstName || 'there'},\n\nThank you for your purchase of ${quantity || 'N/A'} ticket(s) for "${showTitle || 'Your Event'}" on ${showDate || 'N/A'} at ${venue || 'N/A'}.`;

//         const emailHtml = await render(<EmailTemplate
//           firstName={firstName || 'N/A'}
//           showTitle={showTitle || 'N/A'}
//           showDate={showDate || 'N/A'}
//           quantity={quantity || 'N/A'}
//           venue={venue || 'N/A'}
//           isPreview={isPreview}
//         />);

//         const { data, error } = await resend.emails.send({
//           from: 'Tickets <notifications@tickets.recordsonthewall.co>',
//           to: purchaserEmail,
//           subject: `Your Tickets for ${showTitle || 'Your Event'}`,
//           html: emailHtml,
//           text: emailText,
//         });

//         if (error) {
//           console.error('❌ Resend email error:', error);
//           return new Response(JSON.stringify({ received: true, emailSent: false, error: error.message }), { status: 200 });
//         }

//         console.log('✅ Email sent successfully via Resend:', data);

//       } catch (emailError: unknown) {
//         const errorMessage = emailError instanceof Error ? emailError.message : String(emailError);
//         console.error('❌ General error sending email:', errorMessage);
//         console.error('❌ Full error object:', emailError);
//         return new Response(JSON.stringify({
//           received: true,
//           emailSent: false,
//           error: `Email sending failed: ${errorMessage}`
//         }), { status: 200 });
//       }


//       // ADD THIS: Insert payment record into database
//       const dbResult = await insertPaymentRecord(session);
//       if (!dbResult) {
//         console.error('❌ Failed to insert payment record for session:', session.id);
//       } 
//       // else {
//       //   console.log('✅ Payment record inserted successfully for session:', session.id);
//       // }

//       return new Response(JSON.stringify({ received: true, emailSent: true }), { status: 200 });

//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   return new Response(JSON.stringify({ received: true }), { status: 200 });
// }


import Stripe from 'stripe';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { EmailTemplate } from '@/components/emails/email-template';
import { neon } from '@neondatabase/serverless';

// =============================================================================
// INITIALIZE SERVICES
// =============================================================================

// Initialize Stripe with your secret key (from environment variables)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-03-31.basil',
});

// Initialize Resend with your API key (from environment variables)
const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Neon client for database operations
const sql = neon(process.env.DATABASE_URL!);

// =============================================================================
// DATABASE OPERATIONS
// =============================================================================

// Function to insert payment record into database
async function insertPaymentRecord(session: Stripe.Checkout.Session) {
  try {
    const metadata = session.metadata || {};

    // console.log('🔍 Raw metadata from Stripe:', JSON.stringify(metadata, null, 2));

    const paymentData = {
      show_id: metadata.show_id || '',
      show_title: metadata.showTitle || '',
      venue: metadata.venue || '',
      show_date: metadata.showDate || '',
      ticket_price: parseFloat(metadata.ticketPrice || '0') / 100,
      is_dos_price: metadata.isDayOfShow === 'true',
      ticket_quantity: parseInt(metadata.quantity || '1'),
      total_ticket_price: parseFloat(metadata.ticketPriceTotal || '0') / 100,
      customer_name: session.customer_details?.name || '',
      customer_email: session.customer_details?.email || '',
      total_amount_paid: parseFloat(metadata.checkoutTotal || '0') / 100,
      tax_total: parseFloat(metadata.taxTotal || '0') / 100,
      fee_amount: parseFloat(metadata.ticketFeeTotal || '0') / 100,
      stripe_payment_id: session.payment_intent as string,
    };

    await sql`
      INSERT INTO show_payments_final (
        show_id, show_title, venue, show_date, ticket_price,
        is_dos_price, ticket_quantity, total_ticket_price,
        customer_name, customer_email, total_amount_paid,
        tax_total, fee_amount, stripe_payment_id
      ) VALUES (
        ${paymentData.show_id}, ${paymentData.show_title}, ${paymentData.venue}, 
        ${paymentData.show_date}, ${paymentData.ticket_price}, ${paymentData.is_dos_price},
        ${paymentData.ticket_quantity}, ${paymentData.total_ticket_price},
        ${paymentData.customer_name}, ${paymentData.customer_email}, 
        ${paymentData.total_amount_paid}, ${paymentData.tax_total}, 
        ${paymentData.fee_amount}, 
        ${paymentData.stripe_payment_id}
      )
    `;

    console.log('✅ Payment record inserted successfully:');
    return true;
  } catch (error) {
    console.error('❌ Error inserting payment record:', error);
    return false;
  }
}

// =============================================================================
// WEBHOOK HANDLER
// =============================================================================

// Function to handle POST requests
export async function POST(req: Request) {
  // ---------------------------------------------------------------------------
  // Webhook Signature Verification
  // ---------------------------------------------------------------------------
  const signature = req.headers.get('stripe-signature');
  let event: Stripe.Event;

  if (!signature) {
    console.error('❌ Missing stripe-signature header');
    return new Response('No stripe-signature header', { status: 400 });
  }

  // Add logging for environment variables (without exposing secrets)
  // console.log('🔍 Environment check:', {
  //   hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
  //   hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
  //   hasResendKey: !!process.env.RESEND_API_KEY,
  //   nodeEnv: process.env.NODE_ENV,
  //   vercelEnv: process.env.VERCEL_ENV
  // });

  try {
    const rawBody = await req.text();

    // console.log('🔍 Webhook verification attempt:', {
    //   bodyLength: rawBody.length,
    //   signaturePresent: !!signature
    // });

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

  // ---------------------------------------------------------------------------
  // Event Handling
  // ---------------------------------------------------------------------------
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;

     // console.log('✅ Checkout session completed:', session.id);

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

      // Check if we're in preview/staging environment
      const isPreview = process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV !== 'production';

      // -------------------------------------------------------------------------
      // Email Operations
      // -------------------------------------------------------------------------
      try {
        const emailText = `Hi ${firstName || 'there'},\n\nThank you for your purchase of ${quantity || 'N/A'} ticket(s) for "${showTitle || 'Your Event'}" on ${showDate || 'N/A'} at ${venue || 'N/A'}.`;

        const emailHtml = await render(<EmailTemplate
          firstName={firstName || 'N/A'}
          showTitle={showTitle || 'N/A'}
          showDate={showDate || 'N/A'}
          quantity={quantity || 'N/A'}
          venue={venue || 'N/A'}
          isPreview={isPreview}
        />);

        const { data, error } = await resend.emails.send({
          from: 'Tickets <notifications@tickets.recordsonthewall.co>',
          to: purchaserEmail,
          subject: `Your Tickets for ${showTitle || 'Your Event'}`,
          html: emailHtml,
          text: emailText,
        });

        if (error) {
          console.error('❌ Resend email error:', error);
          return new Response(JSON.stringify({ received: true, emailSent: false, error: error.message }), { status: 200 });
        }

        console.log('✅ Email sent successfully via Resend:', data);

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

      // -------------------------------------------------------------------------
      // Database Operations
      // -------------------------------------------------------------------------
      const dbResult = await insertPaymentRecord(session);
      if (!dbResult) {
        console.error('❌ Failed to insert payment record for session:', session.id);
      } 
      // else {
      //   console.log('✅ Payment record inserted successfully for session:', session.id);
      // }

      return new Response(JSON.stringify({ received: true, emailSent: true }), { status: 200 });

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}