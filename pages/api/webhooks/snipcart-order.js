import nc from 'next-connect';
import db from '../../../utils/db';
import Order from '../../../models/order';

const handler = nc();

handler.post(async (req, res) => {
  const saveOrder = {
    eventName: 'order.completed',
    content: {
      token: '1912e4c1-d008-4c15-ab12-fe21a76d30d4',
    },
  };
  try {
    await db.connectDB();

    const order = await new Order(saveOrder).save();

    res.json({ message: order });

    await db.disconnectDB();
  } catch (errors) {
    res.status(500).json({ errors });
  }
});

export default handler;
