import emailTemplate from '@/email/emailTemplate';

export default function mailError() {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_FULL_API);
  const msg = {
    to: 'mike@mikegulline.com',
    from: 'orders@loyaltofew.com',
    subject: `LTF: ERROR`,
    text: 'message',
    html: emailTemplate(`message`),
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('error email sent');
    })
    .catch((error) => {
      console.error('error in emailError()', error);
    });
}
