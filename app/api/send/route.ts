// This file is responsible for sending test emails locally using the Resend API at http://localhost:3000/api/test-email
// It handles both the POST request to send an email and a GET request for testing purposes.
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

    // Default test recipient - pass the actual recipient in production
    let recipients = ['erdev.levasseur@gmail.com'];

    // Default subject
    let subject = 'Your Ticket Purchase';

    // Create props for the email template
    const templateProps = {
      firstName: "Eric",
      showTitle: "Test Show",
      showDate: "2025-10-31",
      quantity: "2",
      venue: "Test Venue",
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
          from: `Tickets <notifications@${EMAIL_DOMAIN}>`,
          to: recipients,
          subject: subject,
          templateProps: templateProps // Log the props instead of rendered HTML
        });
      }
    }

    const { data, error } = await resend.emails.send({
      from: `Tickets <notifications@${EMAIL_DOMAIN}>`,
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