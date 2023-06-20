// Get order info from Snipcart by InvoiceNumber
// Used in pages/admin/returns/
import nc from 'next-connect';
import axios from 'axios';
import getTokenByInvoiceNumber from '@/utils/getTokenByInvoiceNumber';
import emailTemplate from '@/email/emailTemplate';

const handler = new nc();

// get order info from snipcart by invoice number
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
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_FULL_API);
  const msg = {
    to: email,
    from: process.env.RETURNS_EMAIL,
    subject: `LTF: Order Packed (${invoice_number})`,
    text: textEmail(tracking_url, invoice_number),
    html: htmlEmail(tracking_url, invoice_number),
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('email tracking infos');
    })
    .catch((error) => {
      console.error('error in sendTrackingEmail()', error);
    });
  return;
}

function textEmail(tracking_url, invoice_number) {
  return `
Order Packed (${invoice_number})

Your order is packaged and out the door for delivery, click here for tracking information. Please note that it may take up to 24 hours to reflect on the carrier's site.

${tracking_url}

Thank you for being a loyal customer,
Loyal To Few®`;
}

function htmlEmail(tracking_url, invoice_number) {
  const body = `
  <h2>Order Packed (${invoice_number})</h2>
  <p>Your order is packaged and out the door for delivery, <a href="${tracking_url}" title="Click here to track your package">click here</a> for tracking information. Please note that it may take up to 24 hours to reflect on the carrier's site.</p>
  <p>Thank you for being a loyal customer,<br/>Loyal To Few®</p>`;
  return emailTemplate(body);
}

export default handler;
