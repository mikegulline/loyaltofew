// Get order info from Snipcart by InvoiceNumber
// Used in pages/admin/returns/
import nc from 'next-connect';
import axios from 'axios';

const handler = new nc();

// get order info from snipcart by orderToken
handler.get(async (req, res) => {
  const { orderToken } = req.query;

  let error;

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
      return res.status(200).json({ error: 'Bad Order Token', order: null });
    }
  }
  return res.status(200).json({ error: 'No Order Token', order: null });
});

export default handler;
