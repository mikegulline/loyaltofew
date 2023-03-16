import nc from 'next-connect';
import Mail from '../../../../models/mail';
import db from '../../../../utils/db';

const handler = new nc();

handler.post(async (req, res) => {
  try {
    const { name, email, invoice, message } = req.body;
    // await db.connectDB();
    // const mail = await new Mail({ name, email, invoice, message }).save();

    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_FULL_API);
    // const msg = {
    //   to: 'orders@loyaltofew.com',
    //   from: email,
    //   subject:
    //     'LTF Contact Form' + (invoice ? ' (Invoice: ' + invoice + ')' : ''),
    //   text: `
    // From: ${name}
    // ${invoice ? `Invoice:  ${invoice}` : ``}

    // ${message}`,
    //   html: `
    //       <p><strong>From:</strong> ${name}
    //       ${invoice ? `<br /><strong>Invoice:</strong>  ${invoice}` : ``}</p>

    //       <hr />

    //       <p>${message}</p>`,
    // };
    // sgMail
    //   .send(msg)
    //   .then(() => {
    //     console.log('Email sent');
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // await db.disconnectDB();
    await later(5000);

    return res.status(200).json({ message: 'Message sent!' });
  } catch (errors) {
    return res.status(500).json({ message: 'Trouble saving mail.', errors });
  }
});

function later(delay) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}

handler.get(async (req, res) => {
  console.log('getting mail');
  try {
    await db.connectDB();
    const mail = await Mail.find({});
    await db.disconnectDB();

    return res.status(200).json(mail);
  } catch (errors) {
    return res.status(500).json({ message: 'Trouble getting mail', errors });
  }
});

export default handler;
