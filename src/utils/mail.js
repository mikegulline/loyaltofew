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
    console.error('mail send error mail.js:', {
      error: error.message,
      response: error.response?.body,
      email,
    });
    // Re-throw the error so calling code can handle it
    throw new Error(
      `Failed to send email: ${error.message || 'Unknown error'}`
    );
  }
}
