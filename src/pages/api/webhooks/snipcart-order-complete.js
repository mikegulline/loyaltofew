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
import mailError from '@/utils/mailError';

const handler = nc();

handler.post(async (req, res) => {
  const {
    eventName,
    content: { items, token, shippingFees, email, invoiceNumber },
  } = { ...req.body };

  // return early if not order.completed webhook
  if (eventName != 'order.completed') {
    return res.json({ message: eventName });
  }

  // set up vars
  let rates;
  let shipping;
  let tracking = { public_url: 'none' };
  const totalItems = items.length;

  try {
    // open db once and close in finally
    await db.connectDB();

    // 1. get saved rates by orderToken and cost from db
    try {
      rates = await Rate.find({
        orderToken: token,
        cost: shippingFees,
      }).exec();
      if (!rates?.length) {
        throw { error: 'could not find rates' };
      }
    } catch (error) {
      throw { message: 'get saved rates by orderToken', error };
    }

    // 2. get and buy rates
    try {
      const shipment = await api.Shipment.retrieve(rates[0].shipment_id);
      shipping = await shipment.buy(rates[0].rate_id);
    } catch (error) {
      throw { message: 'get and buy rates error', error };
    }

    // 3. get tracking url from api
    await new Promise((r) => setTimeout(r, 5000));

    try {
      try {
        tracking = await api.Tracker.retrieve(shipping.tracker.id);
      } catch (error) {
        await mailError(
          {
            message:
              'getting tracking url error :' +
              JSON.stringify(tracking) +
              JSON.stringify(shipping),
            error,
          },
          'snipcart-order-complete.js',
          token,
          email,
          invoiceNumber
        );
      }
    } catch (error) {}

    // try {
    //   tracking = await api.Tracker.retrieve(shipping.tracker.id);
    // } catch (error) {
    //   throw { message: 'getting tracking url error ', error };
    // }

    // create a 0 filled array for packing
    let a = new Array(totalItems);
    for (let i = 0; i < totalItems; i++) a[i] = 0;
    // 4. save tracking info to snipcart
    try {
      const trackingForSnipcart = {
        status: 'Processed',
        trackingNumber: shipping.tracking_code,
        trackingUrl: tracking?.public_url,
        metadata: {
          order_token: token,
          invoice_number: invoiceNumber,
          email,
          parcel: { id: shipping.parcel.id },
          to_address: { id: shipping.to_address.id },
          from_address: { id: shipping.from_address.id },
          shipment_id: shipping.selected_rate.shipment_id,
          tracker_id: shipping.tracker.id,
          rate_id: rates[0].rate_id,
          rate: rates[0].cost,
          tracking_url: tracking?.public_url,
          label_url: shipping.postage_label.label_url,
          label_size: shipping.postage_label.label_size,
          status: 'Processed',
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
    } catch (error) {
      throw { message: 'save tracking info to snipcart error', error };
    }

    // save order token and invoice number to mongodb
    try {
      await Order.create({
        invoiceNumber,
        orderToken: token,
        parcel: shipping.parcel.id,
        from_address: shipping.from_address.id,
        to_address: shipping.to_address.id,
        tracker_id: shipping.tracker.id,
      });
    } catch (error) {
      throw { message: 'save order token and invoice', error };
    }

    // delete rates
    try {
      await Rate.deleteMany({ orderToken: token });
    } catch (error) {
      throw { message: 'delete rates error', error };
    }

    return res.json({ message: eventName });
  } catch (error) {
    // ROOT CATCH
    await mailError(
      error,
      'snipcart-order-complete.js',
      token,
      email,
      invoiceNumber
    );
    return res.status(500).json({ error });
  } finally {
    // FINALLY
    await db.disconnectDB();
  }
});

export default handler;
