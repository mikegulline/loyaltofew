// Get order info from Snipcart by InvoiceNumber
// Used in pages/admin/returns/
import nc from 'next-connect';
import axios from 'axios';
import emailTemplate from '@/email/emailTemplate';
import Return from '@/models/return';
import db from '@/utils/db';

const handler = new nc();

// post refund to snipcart
handler.post(async (req, res) => {
  const {
    email,
    invoice_number,
    order_token: token,
    returnData: { refund: amount },
  } = req.body;

  const issueRefund = {
    token,
    amount,
  };
  if ((email, invoice_number, token, amount)) {
    const getReturn = await checkReturnStatusDB(invoice_number);
    if (getReturn[0]?.status !== 'RETURN STARTED') {
      const message = `Not able to refund ${invoice_number} (Status: ${getReturn[0]?.status})`;
      return res.status(200).json({ error: message, refund: null });
    }
    try {
      const secret = process.env.SNIPCART_SECRET + ':';
      const { data } = await axios.post(
        `https://app.snipcart.com/api/v1/orders/${token}/refunds`,
        issueRefund,
        {
          headers: {
            Authorization: `Basic ${btoa(secret)}`,
            Accept: 'application/json',
          },
        }
      );
      sendRefundEmail(invoice_number, email, amount);
      await updateReturnsDB(invoice_number);
      return res.status(200).json({ error: null, refund: data });
    } catch (error) {
      console.log({ error, message: 'problem issuing refund (1)' });
    }
  }
  return res
    .status(200)
    .json({ error: 'problem issuing refund (2)', refund: null });
});

////////////////////////
// helper funcitions
////////////////////////

async function updateReturnsDB(invoice_number) {
  try {
    const filter = { invoiceNumber: invoice_number };
    const update = { status: 'REFUND ISSUED' };
    await db.connectDB();
    await Return.findOneAndUpdate(filter, update);
    await db.disconnectDB();
  } catch (error) {
    console.log('error in updateReturnsDB()', error);
  } finally {
    return;
  }
}

async function checkReturnStatusDB(invoice_number) {
  try {
    await db.connectDB();
    const getReturn = await Return.find({
      invoiceNumber: invoice_number,
    }).exec();
    await db.disconnectDB();
    return getReturn;
  } catch (error) {
    console.log('error in checkReturnStatusDB()', error);
  }
  return;
}

function sendRefundEmail(invoice_number, email, amount) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_FULL_API);
  const msg = {
    to: email,
    from: process.env.RETURNS_EMAIL,
    subject: `LTF: Refund Issued (${invoice_number})`,
    text: textEmail(amount, invoice_number),
    html: htmlEmail(amount, invoice_number),
  };
  sgMail
    .send(msg)
    .then(() => {})
    .catch((error) => {
      console.error('error in sendRefundEmail()', error);
    });
  return;
}

function textEmail(amount, invoice_number) {
  return `
Refund Issued (${invoice_number})

Thank you for returning your unwanted items.

A refund has been issued to your credit card in the amount of $${amount.toFixed(
    2
  )}.

Thank you for being a loyal customer,
Matt Sagoian
Owner, Loyal To Few®`;
}

function htmlEmail(amount, invoice_number) {
  const body = `
  <h2>Refund Issued (${invoice_number})</h2>
  <p>Thank you for returning your unwanted items.</p>
  <p>A refund has been issued to your credit card in the amount of $${amount.toFixed(
    2
  )}.</p>
  <p>Thank you for being a loyal customer,<br/>Matt Sagoian<br/>Owner, Loyal To Few®</p>`;
  return emailTemplate(body);
}

export default handler;
