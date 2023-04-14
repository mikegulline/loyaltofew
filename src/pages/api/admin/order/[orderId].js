// Get order info from Snipcart by InvoiceNumber
// Used in pages/admin/returns/
import nc from 'next-connect';
import axios from 'axios';
import getTokenByInvoiceNumber from '@/utils/getTokenByInvoiceNumber';
import emailTemplate from '@/email/emailTemplate';

const handler = new nc();

// get order info from snipcart
handler.get(async (req, res) => {
  const { orderId: invoiceNumber } = req.query;
  const { orderToken, error } = await getTokenByInvoiceNumber(invoiceNumber);
  if (orderToken) {
    try {
      const secret = process.env.SNIPCART_SECRET + ':';
      const { data } = await axios.get(
        `https://app.snipcart.com/api/orders/${orderToken}`,
        {
          headers: {
            Authorization: `Basic ${btoa(secret)}`,
            Accept: 'application/json',
          },
        }
      );
      return res.status(200).json({ error: null, order: data });
    } catch (error) {
      console.log({ error, message: 'problem getting order information' });
    }
  }
  return res.status(200).json({ error, order: null });
});

// update snipcart
handler.put(async (req, res) => {
  const passData = req.body;
  const { orderId: token } = req.query;

  if (req.query?.ship) {
    // email tracking infos
    const { email, tracking_url, invoice_number } = passData.metadata;
    sendTrackingEmail(email, tracking_url, invoice_number);
  }

  try {
    const secret = process.env.SNIPCART_SECRET + ':';
    const { data } = await axios.put(
      `https://app.snipcart.com/api/orders/${token}`,
      passData,
      {
        headers: {
          Authorization: `Basic ${btoa(secret)}`,
          Accept: 'application/json',
        },
      }
    );
    return res.status(200).json({ data });
  } catch (errors) {
    console.log({ passData, errors });
  }
});

////////////////////////
// helper funcitions
////////////////////////

function sendTrackingEmail(email, tracking_url, invoice_number) {
  console.log(email, tracking_url, invoice_number);
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_FULL_API);
  const msg = {
    to: email,
    from: 'orders@loyaltofew.com',
    subject: `LTF: Order Packed (${invoice_number})`,
    text: textEmail(tracking_url, invoice_number),
    html: htmlEmail(tracking_url, invoice_number),
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('email tracking infos', tracking_url);
    })
    .catch((error) => {
      console.error('error in sendTrackingEmail()', error);
    });
  return;
}

function textEmail(tracking_url, invoice_number) {
  return `
Order Packed (${invoice_number})

Your order has been packed and will be shipped either today or tomorrow.
    
You may track your package using the following URL.

${tracking_url}

Thank you for being a loyal customer,
Matt Sagoian
Owner, Loyal To Few
  
  `;
}

function htmlEmail(tracking_url, invoice_number) {
  const body = `
  <h2>Order Packed (${invoice_number})</h2>
  <p>Your order has been packed and will be shipped either today or tomorrow.</p>
  <p>You may click here to <a href="${tracking_url}" title="Click here to track your package">track your package</a>.</p>
  <p>Thank you for being a loyal customer,<br/>Matt Sagoian<br/>Owner, Loyal To Few</p>
  `;
  return emailTemplate(body);
}

export default handler;
