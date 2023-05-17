import emailTemplate from '@/email/emailTemplate';

export default async function mailError({ message, error }) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_FULL_API);
  const msg = {
    to: 'mike@mikegulline.com',
    from: 'orders@loyaltofew.com',
    subject: `LTF: ERROR`,
    text: message + ' ||| ' + error,
    html: emailTemplate(message + '<br />' + error),
  };
  try {
    await sgMail.send(msg).then(() => {
      console.log('error email sent');
    });
  } catch (error) {
    console.log(error);
  }
  return;
}
