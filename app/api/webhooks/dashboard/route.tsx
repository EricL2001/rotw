// import Stripe from 'stripe';
// import { neon } from '@neondatabase/serverless';

// // Initialize Stripe with your secret key (from environment variables)
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: '2025-03-31.basil',
// });

// // Initialize Neon client
// const sql = neon(process.env.DATABASE_URL!);

// Function to insert payment record into database
// async function insertPaymentRecord(session: Stripe.Checkout.Session) {
//   try {
//     const metadata = session.metadata || {};
    
//     // Extract data from Stripe session
//     const paymentData = {
//       show_id: metadata.show_id || '',
//       show_title: metadata.showTitle || '',
//       venue: metadata.venue || '',
//       show_date: metadata.showDate || '',
//       ticket_price: parseFloat(metadata.ticketPrice || '0'),
//       is_dos_price: metadata.isDayOfShow === 'true',
//       ticket_quantity: parseInt(metadata.quantity || '1'),
//       total_ticket_price: parseFloat(metadata.ticketPriceTotal || '0'),
//       customer_name: session.customer_details?.name || '',
//       customer_email: session.customer_details?.email || '',
//       total_amount_paid: parseFloat(metadata.checkoutTotal || '0') / 100, // Convert from cents
//       tax_total: parseFloat(metadata.taxTotal || '0') / 100, // Convert from cents
//       fee_amount: parseFloat(metadata.ticketFeeTotal || '0') / 100, // Convert from cents
//       payment_status: 'paid',
//       stripe_payment_id: session.payment_intent as string,
//     };

//     // Insert into database
//     const result = await sql`
//       INSERT INTO show_payments_final (
//         show_id, show_title, venue, show_date, ticket_price,
//         is_dos_price, ticket_quantity, total_ticket_price,
//         customer_name, customer_email, total_amount_paid,
//         tax_total, fee_amount, payment_status, stripe_payment_id
//       ) VALUES (
//         ${paymentData.show_id}, ${paymentData.show_title}, ${paymentData.venue}, 
//         ${paymentData.show_date}, ${paymentData.ticket_price}, ${paymentData.is_dos_price},
//         ${paymentData.ticket_quantity}, ${paymentData.total_ticket_price},
//         ${paymentData.customer_name}, ${paymentData.customer_email}, 
//         ${paymentData.total_amount_paid}, ${paymentData.tax_total}, 
//         ${paymentData.fee_amount}, ${paymentData.payment_status}, 
//         ${paymentData.stripe_payment_id}
//       )
//     `;

//     console.log('Payment record inserted successfully:', result);
//     return true;
//   } catch (error) {
//     console.error('Error inserting payment record:', error);
//     return false;
//   }
// }

// // Function to handle POST requests
// export async function POST(req: Request) {
//   const signature = req.headers.get('stripe-signature');
//   let event: Stripe.Event;

//   if (!signature) {
//     console.error('No Stripe signature found');
//     return new Response('No signature', { status: 400 });
//   }

//   try {
//     const body = await req.text();
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET as string
//     );
//   } catch (err) {
//     console.error('Webhook signature verification failed:', err);
//     return new Response('Webhook signature verification failed', { status: 400 });
//   }

//   // Handle the checkout.session.completed event
//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object as Stripe.Checkout.Session;
    
//     console.log('Checkout session completed:', session.id);
    
//     // Insert payment record into database
//     const insertResult = await insertPaymentRecord(session);
    
//     if (!insertResult) {
//       console.error('Failed to insert payment record for session:', session.id);
//       // Continue processing even if database insert fails
//     }
//   }

//   return new Response('Webhook received', { status: 200 });
// }

// Function to insert payment record into database
// async function insertPaymentRecord(session: Stripe.Checkout.Session) {
//   try {
//     const metadata = session.metadata || {};
    
//     // Debug: Log the raw metadata
//     console.log('🔍 Raw metadata from Stripe:', JSON.stringify(metadata, null, 2));
    
//     // Extract data from Stripe session
//     const paymentData = {
//       show_id: metadata.show_id || '',
//       show_title: metadata.showTitle || '',
//       venue: metadata.venue || '',
//       show_date: metadata.showDate || '',
//       ticket_price: parseFloat(metadata.ticketPrice || '0'),
//       is_dos_price: metadata.isDayOfShow === 'true',
//       ticket_quantity: parseInt(metadata.quantity || '1'),
//       total_ticket_price: parseFloat(metadata.ticketPriceTotal || '0'),
//       customer_name: session.customer_details?.name || '',
//       customer_email: session.customer_details?.email || '',
//       total_amount_paid: parseFloat(metadata.checkoutTotal || '0') / 100, // Convert from cents
//       tax_total: parseFloat(metadata.taxTotal || '0') / 100, // Convert from cents
//       fee_amount: parseFloat(metadata.ticketFeeTotal || '0') / 100, // Convert from cents
//       payment_status: 'paid',
//       stripe_payment_id: session.payment_intent as string,
//     };

//     // Debug: Log the processed payment data
//     console.log('💳 Processed payment data:', JSON.stringify(paymentData, null, 2));
    
//     // Debug: Check customer details
//     console.log('👤 Customer details:', JSON.stringify(session.customer_details, null, 2));

//     // Insert into database
//     const result = await sql`
//       INSERT INTO show_payments_final (
//         show_id, show_title, venue, show_date, ticket_price,
//         is_dos_price, ticket_quantity, total_ticket_price,
//         customer_name, customer_email, total_amount_paid,
//         tax_total, fee_amount, payment_status, stripe_payment_id
//       ) VALUES (
//         ${paymentData.show_id}, ${paymentData.show_title}, ${paymentData.venue}, 
//         ${paymentData.show_date}, ${paymentData.ticket_price}, ${paymentData.is_dos_price},
//         ${paymentData.ticket_quantity}, ${paymentData.total_ticket_price},
//         ${paymentData.customer_name}, ${paymentData.customer_email}, 
//         ${paymentData.total_amount_paid}, ${paymentData.tax_total}, 
//         ${paymentData.fee_amount}, ${paymentData.payment_status}, 
//         ${paymentData.stripe_payment_id}
//       )
//     `;

//     console.log('✅ Payment record inserted successfully:', result);
//     return true;
//   } catch (error) {
//     console.error('❌ Error inserting payment record:', error);
//     console.error('Error details:', error instanceof Error ? error.message : String(error));
//     return false;
//   }
// }

// // Function to handle POST requests
// export async function POST(req: Request) {
//   console.log('🎯 Webhook received!');
  
//   const signature = req.headers.get('stripe-signature');
//   let event: Stripe.Event;

//   if (!signature) {
//     console.error('❌ No Stripe signature found');
//     return new Response('No signature', { status: 400 });
//   }

//   try {
//     const body = await req.text();
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET as string
//     );
    
//     console.log('🔐 Webhook signature verified successfully');
//     console.log('📦 Event type:', event.type);
//   } catch (err) {
//     console.error('❌ Webhook signature verification failed:', err);
//     return new Response('Webhook signature verification failed', { status: 400 });
//   }

//   // Handle the checkout.session.completed event
//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object as Stripe.Checkout.Session;
    
//     console.log('💰 Checkout session completed:', session.id);
    
//     // Insert payment record into database
//     const insertResult = await insertPaymentRecord(session);
    
//     if (!insertResult) {
//       console.error('❌ Failed to insert payment record for session:', session.id);
//       // Continue processing even if database insert fails
//     } else {
//       console.log('✅ Successfully processed payment for session:', session.id);
//     }
//   } else {
//     console.log('ℹ️ Ignoring event type:', event.type);
//   }

//   return new Response('Webhook received', { status: 200 });
// }