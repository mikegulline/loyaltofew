import emailTemplate from '@/email/emailTemplate';

export default async function mailError(
  { message, error },
  file = '',
  token = '',
  email = '',
  invoice = 'none'
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
      ' ||| Invoice: ' +
      invoice +
      ' ||| Email: ' +
      email +
      ' ||| Message: ' +
      message +
      ' ||| File: ' +
      file +
      ' ||| Error: ' +
      JSON.stringify(error),
    html: emailTemplate(
      '<strong>Token:</strong> ' +
        token +
        '<br /><strong>Invoice:</strong> ' +
        invoice +
        '<br /><strong>Email:</strong> ' +
        email +
        '<br /><strong>Message:</strong> ' +
        message +
        '<br /><strong>File:</strong> ' +
        file +
        '<br /><strong>Error:</strong> ' +
        JSON.stringify(error)
    ),
  };
  try {
    await sgMail.send(msg);
    console.log('error email sent');
  } catch (error) {
    console.log(error);
  }
  return;
}
