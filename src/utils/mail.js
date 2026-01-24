import emailTemplate from '@/email/emailTemplate';

export default async function mail(email, subject, message) {
  try {
    const sgMail = require('@sendgrid/mail');
    
    // Check if SendGrid API key is configured
    if (!process.env.SENDGRID_FULL_API) {
      const error = new Error('SendGrid API key is not configured');
      console.error('mail.js error: SENDGRID_FULL_API environment variable is missing');
      throw error;
    }
    
    // Log API key status (first few chars only for security)
    const apiKeyPreview = process.env.SENDGRID_FULL_API 
      ? `${process.env.SENDGRID_FULL_API.substring(0, 10)}...` 
      : 'NOT SET';
    console.log('SendGrid API key status:', apiKeyPreview);
    
    sgMail.setApiKey(process.env.SENDGRID_FULL_API);
    
    // Generate HTML email template
    let htmlMessage;
    try {
      htmlMessage = emailTemplate(message);
    } catch (templateError) {
      console.error('Error generating email template:', templateError);
      // Fallback to plain HTML if template fails
      htmlMessage = `<html><body>${message}</body></html>`;
    }
    
    const msg = {
      to: email,
      from: 'orders@loyaltofew.com',
      subject: subject,
      text: message,
      html: htmlMessage,
    };
    
    await sgMail.send(msg);
    console.log('mail sent to', email);
  } catch (error) {
    const errorDetails = {
      message: error?.message || 'Unknown error',
      code: error?.code,
      response: error?.response?.body,
      email,
      stack: error?.stack,
    };
    console.error('mail send error mail.js:', JSON.stringify(errorDetails, null, 2));
    
    // Handle 401 Unauthorized specifically
    if (error?.code === 401 || error?.response?.statusCode === 401) {
      console.error('SendGrid API key authentication failed. Please verify:');
      console.error('1. The API key is correct in Vercel environment variables');
      console.error('2. The API key has "Mail Send" permissions enabled');
      console.error('3. The API key has not been revoked or regenerated');
      throw new Error('SendGrid API authentication failed. Please check your API key configuration.');
    }
    
    // Re-throw the error so calling code can handle it
    // Include more details if available from SendGrid
    const errorMessage = error?.response?.body?.errors?.[0]?.message 
      || error?.message 
      || 'Failed to send email';
    throw new Error(errorMessage);
  }
}
