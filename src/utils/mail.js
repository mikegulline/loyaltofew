import emailTemplate from '@/email/emailTemplate';

export default async function mail(email, subject, message) {
  const sgMail = require('@sendgrid/mail');
  
  // Check if SendGrid API key is configured
  if (!process.env.SENDGRID_FULL_API) {
    const error = new Error('SendGrid API key is not configured');
    console.error('mail.js error:', error.message);
    throw error;
  }
  
  sgMail.setApiKey(process.env.SENDGRID_FULL_API);
  const msg = {
    to: email,
    from: 'orders@loyaltofew.com',
    subject: subject,
    text: message,
    html: emailTemplate(message),
  };
  try {
    await sgMail.send(msg);
    console.log('mail sent to', email);
  } catch (error) {
    const errorDetails = {
      message: error?.message || 'Unknown error',
      code: error?.code,
      response: error?.response?.body,
      email,
    };
    console.error('mail send error mail.js:', errorDetails);
    
    // Re-throw the error so calling code can handle it
    // Include more details if available from SendGrid
    const errorMessage = error?.response?.body?.errors?.[0]?.message 
      || error?.message 
      || 'Failed to send email';
    throw new Error(errorMessage);
  }
}
