import emailTemplate from '@/email/emailTemplate';

export default function mailError(message, file) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_FULL_API);
  const msg = {
    to: 'mike@mikegulline.cpom',
    from: process.env.RETURNS_EMAIL,
    subject: `LTF: ERROR (${file})`,
    text: message,
    html: emailTemplate(message),
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
