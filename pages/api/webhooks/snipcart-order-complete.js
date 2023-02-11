import nc from 'next-connect';
import db from '../../../utils/db';
import Order from '../../../models/order';
import Rate from '../../../models/rate';
import api from './utils/easyPostApi';

const handler = nc();

handler.post(async (req, res) => {
  const saveOrder = { ...req.body };

  if (saveOrder.eventName === 'order.completed') {
    // get saved rates from db
    try {
      const rates = await Rate.find({
        orderToken: req.body.content.token,
        cost: req.body.content.shippingFees,
      });
      if (!rates?.length)
        return res.status(500).json({ errors: 'could not find rates' });
    } catch (errors) {
      return res.status(500).json({ errors });
    }

    // buy shipping
    try {
      const shipment = await api.Shipment.retrieve(rates.shipment_id);

      const save = await shipment.buy(rates.cost);

      return res.json({ save });
    } catch (errors) {
      return res.status(500).json({ errors });
    }

    // save tracking infos
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
