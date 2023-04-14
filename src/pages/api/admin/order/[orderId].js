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
    const {email, tracking_url} = passData.metadata
    sendTrackingEmail(email, tracking_url);
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

function sendTrackingEmail(email, tracking_url) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_FULL_API);
  const msg = {
    to: email,
    from: 'orders@loyaltofew.com',
    subject: `LTF: Order Packed`,
    text: `Order Packed
    
    ${label_url}`,
    html: emailTemplate(`
    <h2>Order Packed</h2>
    <p>Your order has been packed and is ready to ship.</p>
    <p></p>
    `),
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

export default handler;
