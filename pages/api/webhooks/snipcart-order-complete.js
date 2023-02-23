import nc from 'next-connect';
import db from '../../../utils/db';
import Rate from '../../../models/rate';
import api from './utils/easyPostApi';
import axios from 'axios';

const handler = nc();

handler.post(async (req, res) => {
  const saveOrder = { ...req.body };

  if (saveOrder.eventName === 'order.completed') {
    let rates;
    let shipping;
    let tracking;

    // 1. get saved rates by orderToken and cost from db
    try {
      await db.connectDB();
      rates = await Rate.find({
        orderToken: saveOrder.content.token,
        cost: saveOrder.content.shippingFees,
      }).exec();
      await db.disconnectDB();
      if (!rates?.length) {
        return res.status(500).json({ errors: 'could not find rates' });
      }
    } catch (errors) {
      return res.status(500).json({ message: 'db error', errors });
    }

    // 2. get and buy shipping
    try {
      const shipment = await api.Shipment.retrieve(rates[0].shipment_id);

      shipping = await shipment.buy(rates[0].rate_id);
    } catch (errors) {
      return res.status(500).json({ message: 'shipping errors', errors });
    }

    // 3. get tracking url from api
    try {
      tracking = await api.Tracker.retrieve(shipping.tracker.id);
    } catch (errors) {
      res.status(500).json({ message: 'error getting tracking url', errors });
    }

    // 4. save tracking info to snipcart
    try {
      const trackingForSnipcart = {
        status: 'Processed',
        trackingNumber: shipping.tracking_code,
        trackingUrl: tracking.public_url,
        metadata: {
          trackerId: shipping.tracker.id,
          carrier: tracking.carrier,
          ...shipping.postage_label,
          ...shipping.selected_rate,
        },
      };
      const secret = process.env.SNIPCART_SECRET + ':';
      await axios.put(
        `https://app.snipcart.com/api/orders/${saveOrder.content.token}`,
        trackingForSnipcart,
        {
          headers: {
            Authorization: `Basic ${btoa(secret)}`,
            Accept: 'application/json',
          },
        }
      );
    } catch (errors) {
      res.status(500).json({ message: 'tracking to snipcart', errors });
    }

    // delete rates
    try {
      await db.connectDB();
      await Rate.deleteMany({ orderToken: saveOrder.content.token });
      await db.disconnectDB();
    } catch (errors) {
      res.status(500).json({ message: 'error deleting rates', errors });
    }
  }

  return res.json({ message: 'success' });
});

export default handler;
