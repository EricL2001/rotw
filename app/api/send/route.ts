// import React from 'react';
// import { EmailTemplate } from '@/components/emails/email-template';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// // The verified subdomain you'll set up
// const EMAIL_DOMAIN = 'tickets.recordsonthewall.co';

// export async function POST() {
//   try {
//     // Check if we're in a preview environment
//     const isPreview = process.env.VERCEL_ENV === 'preview';

//     // Default recipient - your actual recipient in production
//     let recipients = ['erdev.levasseur@gmail.com'];

//     // Default subject
//     let subject = 'Hello world';

//     // Create props for the email template
//     const templateProps = {
//       firstName: "Eric",
//       // Add an environment indicator for preview deployments
//       isPreview: isPreview
//     };

//     // Apply safeguards for preview environments
//     if (isPreview) {
//       // Option 1: Add a prefix to the subject line
//       subject = `[TEST] ${subject}`;

//       // Option 2: Override recipient with a test email (optional)
//       // If you want to send to a different email in preview environments
//       if (process.env.TEST_EMAIL_ADDRESS) {
//         recipients = [process.env.TEST_EMAIL_ADDRESS];
//       }
//     }

//     const { data, error } = await resend.emails.send({
//       from: `Notifications <notifications@${EMAIL_DOMAIN}>`, // Using your verified subdomain
//       to: recipients,
//       subject: subject,
//       react: React.createElement(EmailTemplate, templateProps),
//     });

//     if (error) {
//       return Response.json({ error }, { status: 500 });
//     }

//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }

import React from 'react';
import { EmailTemplate } from '@/components/emails/email-template';
import { Resend } from 'resend';

// The verified subdomain you've set up
const EMAIL_DOMAIN = 'tickets.recordsonthewall.co';

// For local development, use debug mode if needed
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    // Check if we're in a test environment (preview or development)
    const isTestEnvironment = 
      process.env.VERCEL_ENV === 'preview' || 
      process.env.VERCEL_ENV === 'development';
    
    // Default recipient - your actual recipient in production
    let recipients = ['erdev.levasseur@gmail.com'];
    
    // Default subject
    let subject = 'Hello world';
    
    // Create props for the email template
    const templateProps = { 
      firstName: "Eric",
      isPreview: isTestEnvironment
    };
    
    // Apply safeguards for test environments
    if (isTestEnvironment) {
      // Add a prefix to the subject line
      subject = `[TEST] ${subject}`;
      
      // Override recipient with a test email if specified
      if (process.env.TEST_EMAIL_ADDRESS) {
        recipients = [process.env.TEST_EMAIL_ADDRESS];
      }
      
      // Log email details in development without using ReactDOMServer
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Email Details:', {
          environment: process.env.VERCEL_ENV,
          from: `Notifications <notifications@${EMAIL_DOMAIN}>`,
          to: recipients,
          subject: subject,
          templateProps: templateProps // Log the props instead of rendered HTML
        });
      }
    }
    
    const { data, error } = await resend.emails.send({
      from: `Notifications <notifications@${EMAIL_DOMAIN}>`,
      to: recipients,
      subject: subject,
      react: React.createElement(EmailTemplate, templateProps),
    });

    if (error) {
      console.error('Resend API Error:', error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('Email Sending Error:', error);
    return Response.json({ error }, { status: 500 });
  }
}

// For easier testing in development
export async function GET() {
  if (process.env.NODE_ENV === 'development') {
    return POST();
  }
  return new Response('Method not allowed', { status: 405 });
}