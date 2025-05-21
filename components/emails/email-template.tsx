import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  isPreview?: boolean;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ 
  firstName,
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
    <h1>Welcome, {firstName}!</h1>
    <p>This is your email content.</p>
  </div>
);