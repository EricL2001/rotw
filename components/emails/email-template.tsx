import * as React from 'react';
import { format, parseISO } from 'date-fns';

interface EmailTemplateProps {
  firstName: string;
  showTitle: string;
  showDate: string;
  quantity: string;
  venue: string;
  isPreview?: boolean;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  firstName,
  showTitle,
  showDate,
  quantity,
  venue,
  isPreview = false
}) => (
  <div>
    {isPreview && (
      <div style={{
        background: '#ffdddd',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ff0000',
        borderRadius: '4px'
      }}>
        ⚠️ This is a test email from a preview environment
      </div>
    )}
    <h1>Hi, {firstName}</h1>
    <p>Thanks for your purchase from Records On The Wall!</p>
    <p>Here are the ticket details to your show:</p>
    <ul>
      <li><strong>Show:</strong> {showTitle}</li>
      <li><strong>Venue:</strong> {venue}</li>
      <li>
        <strong>Date:</strong> {showDate ? format(parseISO(showDate), 'EEE, MMM d') : 'N/A'}
      </li>
      <li><strong>Quantity:</strong> {quantity}</li>
    </ul>
  </div>
);