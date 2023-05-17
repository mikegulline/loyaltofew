import emailTemplate from '@/email/emailTemplate';

export default async function mailError(
  { message, error },
  file = '',
  token = ''
) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_FULL_API);
  const msg = {
    to: 'mike@mikegulline.com',
    from: 'orders@loyaltofew.com',
    subject: `LTF: ERROR `,
    text:
      'Token: ' +
      token +
      'Message: ' +
      message +
      ' ||| File: ' +
      file +
      ' ||| Error: ' +
      JSON.stringify(error),
    html: emailTemplate(
      '<strong>Token:</strong> ' +
        token +
        '<strong>Message:</strong> ' +
        message +
        '<br /><strong>File:</strong> ' +
        file +
        '<br /><strong>Error:</strong> ' +
        JSON.stringify(error)
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
