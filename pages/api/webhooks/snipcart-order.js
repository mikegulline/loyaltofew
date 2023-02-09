import nc from 'next-connect';
import db from '../../../utils/db';
import Order from '../../../models/order';

const handler = nc();

handler.post(async (req, res) => {
  const saveOrder = req.body;
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
