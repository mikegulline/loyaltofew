import nc from 'next-connect';
import db from '../../../utils/db';
import Order from '../../../models/order';
import EasyPostApi from './utils/easyPostApi';

const handler = nc();

handler.post(async (req, res) => {
  const saveOrder = { ...req.body };

  if (saveOrder.eventName === 'order.completed') {
    try {
      const shipment = EasyPostApi.Shipment.retrieve('shp_...').then(
        (shipment) => {
          shipment.buy(shipment.lowestRate(), 249.99).then(console.log);
        }
      );

      const save = await shipment.save();
    } catch (errors) {
      return res.status(500).json({ errors });
    }
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
