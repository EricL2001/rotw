import { POST } from '../send/route';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Call the POST function from the send route
    const response = await POST();

    // Check if the POST function was successful
    if (response.status === 200) {
      return NextResponse.json({ message: 'Test email sent successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Failed to send test email' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}