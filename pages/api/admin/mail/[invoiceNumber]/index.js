import nc from 'next-connect';
import { getOrderToken } from '../../../../../features/mail/';

const handler = new nc();

handler.get(async (req, res) => {
  const { invoiceNumber } = req.query;
  const orderToke = await getOrderToken(invoiceNumber);
  return res.status(200).json(orderToke);
});

export default handler;
