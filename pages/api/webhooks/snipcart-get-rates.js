// Snipcart shipping calculator
// check for saved rates and return
// if none
// connect to Easypost for rates
// save returned rates
// return rates

import nc from 'next-connect';
import getRates from './utils/getRates';
import db from '../../../utils/db';
import Rate from '../../../models/rate';
import axios from 'axios';

const handler = nc();

handler.post(async (req, res) => {
  // check for saved rates and send
  const token = req?.body?.content?.token
  try {
    await db.connectDB();
    const hasRates = await Rate.find({
      orderToken: token,
    }).exec();
    if (hasRates?.length) return res.json({ rates: hasRates });
    await db.disconnectDB();
  } catch (errors) {
    return res.status(500).json({ message: 'error finding rates in db',errors });
  }

  // get rates if none found
  const { rates, errors } = await getRates(req.body);

  // return errors if found
  if (errors) {
    return res.json({ errors, message: 'problem getting rates' });
  }

  // save returned rates
  try {
    await db.connectDB();
    await Rate.insertMany(rates);
    await db.disconnectDB();
  } catch (errors) {
    return res.status(500).json({message: 'error saving rates to db', errors });
  }

  

  // return rates
  return res.json({ rates });
});

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

// the following it a GET handler for testing LOCALLY
// uses static body var instead of req.body
// handler.get(async (req, res) => {
//   const body = {
//     eventName: '',
//     content: {
//       shippingAddressName: 'Mike Gulline',
//       shippingAddressCompanyName: '',
//       shippingAddressAddress1: '7624 Potter Valley Dr.',
//       shippingAddressAddress2: '',
//       shippingAddressCity: 'Eastvale',
//       shippingAddressCountry: 'USA',
//       shippingAddressProvince: 'CA',
//       shippingAddressPostalCode: '92880',
//       shippingAddressPhone: '',
//       totalWeight: 33.3,
//     },
//   };

//   const { rates, errors } = await getRates(body);

//   if (errors) return res.json({ errors });

//   return res.json({ rates });
// });

export default handler;

// [
//   {
//     id: 'rate_455ac7c9213e44438a88810ef95bec41',
//     object: 'Rate',
//     created_at: '2023-02-03T21:37:48Z',
//     updated_at: '2023-02-03T21:37:48Z',
//     mode: 'test',
//     service: 'Express',
//     carrier: 'USPS',
//     rate: '39.05',
//     currency: 'USD',
//     retail_rate: '45.00',
//     retail_currency: 'USD',
//     list_rate: '39.05',
//     list_currency: 'USD',
//     billing_type: 'easypost',
//     delivery_days: null,
//     delivery_date: null,
//     delivery_date_guaranteed: false,
//     est_delivery_days: null,
//     shipment_id: 'shp_2e688ae5a42b4974b81c1519f4b6b9d2',
//     carrier_account_id: 'ca_c96ca3ce49094b3795fe439c3f95d39f'
//   },
// ]
