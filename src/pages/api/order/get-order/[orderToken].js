// Get single order by orderToken API
// called from getOrderByToken.js ONLY
import nc from 'next-connect';
import axios from 'axios';

const handler = new nc();

handler.get(async (req, res) => {
  const { orderToken } = req.query;

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
