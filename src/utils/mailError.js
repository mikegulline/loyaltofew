import emailTemplate from '@/email/emailTemplate';

export default async function mailError({ message, error }, file = '') {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_FULL_API);
  const msg = {
    to: 'mike@mikegulline.com',
    from: 'orders@loyaltofew.com',
    subject: `LTF: ERROR `,
    text: 'message: ' + message + ' ||| file: ' + file + ' ||| error: ' + error,
    html: emailTemplate(
      'message: ' + message + '<br /> file: ' + file + '<br /> error: ' + error
    ),
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
