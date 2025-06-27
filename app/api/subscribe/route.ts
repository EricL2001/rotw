import mailchimp from '@mailchimp/mailchimp_marketing';
import { NextRequest } from 'next/server';

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., 'us1'
});

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName } = await request.json();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return Response.json(
        { 
          error: 'Invalid email address',
          code: 'INVALID_EMAIL'
        },
        { status: 400 }
      );
    }

    // Add member to Mailchimp audience
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      {
        email_address: email.toLowerCase().trim(),
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName || '',
          LNAME: lastName || '',
        },
        tags: ['Website Signup'], // Optional: tag for tracking source
      }
    );

    if ('id' in response) {
      return Response.json(
        { 
          success: true,
          message: 'Successfully subscribed to email list!',
          id: response.id
        },
        { status: 201 }
      );
    } else {
      return Response.json(
        { 
          error: 'Unexpected response from Mailchimp',
          code: 'UNEXPECTED_RESPONSE'
        },
        { status: 500 }
      );
    }

  } catch (error: unknown) {
    console.error('Mailchimp subscription error:', error);

    // Type guard for Mailchimp error structure
    const mailchimpError = error as {
      response?: {
        body?: {
          title?: string;
        };
      };
    };

    // Handle specific Mailchimp errors
    if (mailchimpError.response?.body?.title === 'Member Exists') {
      return Response.json(
        { 
          error: 'This email is already subscribed to our list',
          code: 'ALREADY_SUBSCRIBED'
        },
        { status: 409 }
      );
    }

    if (mailchimpError.response?.body?.title === 'Invalid Resource') {
      return Response.json(
        { 
          error: 'Invalid email address format',
          code: 'INVALID_EMAIL'
        },
        { status: 400 }
      );
    }

    if (mailchimpError.response?.body?.title === 'Forgotten Email Not Subscribed') {
      return Response.json(
        { 
          error: 'This email was previously unsubscribed. Please contact us to resubscribe.',
          code: 'PREVIOUSLY_UNSUBSCRIBED'
        },
        { status: 403 }
      );
    }

    // Generic server error
    return Response.json(
      { 
        error: 'Something went wrong. Please try again later.',
        code: 'SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}