import nc from 'next-connect';
import axios from 'axios';

const handler = new nc();

// update the status of an order => {'Shipped'}
handler.put(async (req, res) => {
  const passData = req.body;
  const token = req.query.orderId;

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
    console.log({ message: 'set status shipped', errors });
  }
});

export default handler;
