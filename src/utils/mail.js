import emailTemplate from '@/email/emailTemplate';

export default async function mail(info, subject) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_FULL_API);
  const msg = {
    to: 'mike@mikegulline.com',
    from: 'orders@loyaltofew.com',
    subject: `LTF: ${subject}`,
    text: JSON.stringify(info),
    html: emailTemplate(JSON.stringify(info)),
  };
  try {
    await sgMail.send(msg);
    console.log('mail sent');
  } catch (error) {
    console.log(error);
  }
  return;
}
