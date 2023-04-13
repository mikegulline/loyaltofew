//Snipcart order complete webhook endpoint
//find rates in MongoDB
//purchase shipping from Easypost
//update Snipcart with shipping infos
//save orderToken, invoiceId, (more?) to MongoDB
//delete rates placeholder
import nc from 'next-connect';
import axios from 'axios';
import db from '@/utils/db';
import api from '@/utils/easyPostApi';
import Rate from '@/models/rate';
import Order from '@/models/order';

const handler = nc();

handler.post(async (req, res) => {
  const {
    eventName,
    content: { items, token, shippingFees, invoiceNumber },
  } = { ...req.body };

  if (eventName === 'order.completed') {
    let rates;
    let shipping;
    let tracking;
    const totalItems = items.length;

    // 1. get saved rates by orderToken and cost from db
    try {
      await db.connectDB();
      rates = await Rate.find({
        orderToken: token,
        cost: shippingFees,
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
      return res
        .status(500)
        .json({ message: 'error getting tracking url', errors });
    }
    // create a 0 filled array for packing
    let a = new Array(totalItems);
    for (let i = 0; i < totalItems; i++) a[i] = 0;
    // 4. save tracking info to snipcart
    try {
      const trackingForSnipcart = {
        status: 'Pending',
        trackingNumber: shipping.tracking_code,
        trackingUrl: tracking.public_url,
        metadata: {
          parcel: { id: shipping.parcel.id },
          to_address: { id: shipping.to_address.id },
          from_address: { id: shipping.from_address.id },
          shipment_id: shipping.selected_rate.shipment_id,
          trackerId: shipping.tracker.id,
          rate_id: shipping.postage_label.id,
          rate: shipping.postage_label.rate,
          label_url: shipping.postage_label.label_url,
          label_size: shipping.postage_label.label_size,
          status: 'Pending',
          packed: a,
        },
      };
      const secret = process.env.SNIPCART_SECRET + ':';
      await axios.put(
        `https://app.snipcart.com/api/orders/${token}`,
        trackingForSnipcart,
        {
          headers: {
            Authorization: `Basic ${btoa(secret)}`,
            Accept: 'application/json',
          },
        }
      );
    } catch (errors) {
      return res.status(500).json({ message: 'tracking to snipcart', errors });
    }

    // save order token and invoice number to mongodb
    try {
      await db.connectDB();
      await Order.create({
        invoiceNumber,
        orderToken: token,
        parcel: shipping.parcel.id,
        from_address: shipping.from_address.id,
        to_address: shipping.to_address.id,
      });
      await db.disconnectDB();
    } catch (errors) {
      return res
        .status(500)
        .json({ message: 'Error saving order info to mongodb.', errors });
    }

    // delete rates
    try {
      await db.connectDB();
      await Rate.deleteMany({ orderToken: token });
      await db.disconnectDB();
    } catch (errors) {
      return res.status(500).json({ message: 'error deleting rates', errors });
    }
  }

  return res.json({ message: 'success' });
});

export default handler;
