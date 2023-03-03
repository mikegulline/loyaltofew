import nc from 'next-connect';
import axios from 'axios';

const handler = new nc();

handler.get(async (req, res) => {
  const { limit, offset, status = 'all' } = req.query;
  const sendStatus = status === 'all' ? `` : `&status=${status}`;
  try {
    const secret = process.env.SNIPCART_SECRET + ':';
    const { data } = await axios.get(
      `https://app.snipcart.com/api/orders?offset=${offset}&limit=${limit}${sendStatus}`,
      {
        headers: {
          Authorization: `Basic ${btoa(secret)}`,
          Accept: 'application/json',
        },
      }
    );
    return res.status(200).json(data);
  } catch (errors) {
    return res
      .status(500)
      .json({ message: 'getting orders from snipcart', errors });
  }
});

export default handler;
