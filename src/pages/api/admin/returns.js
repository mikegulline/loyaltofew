// api for mail
// post = used in @/components/ContactForm.jsx
// get  = used in @/pages/admin/returns/index.jsx
// @NTU need to update…
// change model Mail to Returns
// move get to returns endpoing

import nc from 'next-connect';
import Return from '@/models/return';
import db from '@/utils/db';
import emailTemplate from '@/email/emailTemplate';

const handler = new nc();

handler.post(async (req, res) => {
  try {
    const { name, email, invoice, message } = req.body;

    if (invoice) {
      await db.connectDB();
      const invoiceNumber = invoice.toUpperCase();
      // @NTU need to update…
      // look for invoiceNumber in Orders DB
      // send error if no match
      // change Mail to Returns
      await new Return({ name, email, invoiceNumber, message }).save();
      await db.disconnectDB();
    }

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_FULL_API);
    const msg = {
      to: process.env.EMAIL,
      from: 'orders@loyaltofew.com',
      subject:
        'LTF Contact Form' + (invoice ? ' (Invoice: ' + invoice + ')' : ''),
      text: `
    From: ${name}
    Email: ${email}
    ${invoice ? `Invoice:  ${invoice}` : ``}

    ${message}`,
      html: emailTemplate(`
          <p><strong>From:</strong> ${name}<br />
          <strong>Email:</strong> ${email}
          ${invoice ? `<br /><strong>Invoice:</strong>  ${invoice}` : ``}</p>

          <hr />

          <p>${message}</p>`),
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
        return res.status(200).json({ message: 'Message sent!' });
      })
      .catch((error) => {
        console.error(error);
        return res.status(200).json({ message: 'Error!', error });
      });

    // await later(5000);
  } catch (errors) {
    return res.status(500).json({ message: 'Trouble saving mail.', errors });
  }
});

// function later(delay) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, delay);
//   });
// }

handler.get(async (req, res) => {
  console.log('getting returns');
  try {
    await db.connectDB();
    const returns = await Return.find({});
    await db.disconnectDB();

    return res.status(200).json(returns.reverse());
  } catch (errors) {
    return res.status(500).json({ message: 'Trouble getting returns', errors });
  }
});

export default handler;
