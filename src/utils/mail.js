import emailTemplate from '@/email/emailTemplate';

export default async function mail(email, subject, message) {
  const sgMail = require('@sendgrid/mail');
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
    console.log('mail sent');
  } catch (error) {
    console.log(error);
  }
  return;
}
