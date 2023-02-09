import nc from 'next-connect';
import db from '../../../utils/db';
import Order from '../../../models/order';

const handler = nc();

handler.post(async (req, res) => {
  const saveOrder = { ...req.body };
  if (saveOrder.eventName === 'order.completed') {
    try {
      await db.connectDB();

      const order = await new Order(saveOrder).save();

      await db.disconnectDB();
      return res.json({ message: order });
    } catch (errors) {
      return res.status(500).json({ errors });
    }
  }
  return res.status(200);
});

export default handler;
