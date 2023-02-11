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

      res.json({ message: order });

      await db.disconnectDB();
    } catch (errors) {
      res.status(500).json({ errors });
    }
  }

  return res.status(200);
});

export default handler;
