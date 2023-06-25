// (PUT) update order by orderToken in SnipCart
// updateOrderByToken.js
import nc from 'next-connect';
import axios from 'axios';

const handler = new nc();

// update snipcart
handler.put(async (req, res) => {
  const update = req.body;
  const { orderToken } = req.query;

  try {
    const secret = process.env.SNIPCART_SECRET + ':';
    const { data } = await axios.put(
      `https://app.snipcart.com/api/orders/${orderToken}`,
      update,
      {
        headers: {
          Authorization: `Basic ${btoa(secret)}`,
          Accept: 'application/json',
        },
      }
    );
    return res.status(200).json({ data });
  } catch (errors) {
    console.log({ update, errors });
  }
});

export default handler;
