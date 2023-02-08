// Snipcart shipping calculator
// connect to Easypost for rates
import nc from 'next-connect';
import getRates from './utils/getRates';

const handler = nc();

handler.post(async (req, res) => {
  const { token } = req.body.content;

  // connect to DB
  //  check for entry by {token}
  //    (if found)
  //      disconnect from DB
  //      return formatted rate

  const { rates, errors } = await getRates(req.body);

  if (errors) {
    // disconnect from DB
    return res.json({ errors });
  }

  //  save rate by {token}
  // disconnect from DB

  return res.json({ rates });
});

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

// the following it a GET handler for testing LOCALLY
// uses static body var instead of req.body
handler.get(async (req, res) => {
  const body = {
    eventName: '',
    content: {
      shippingAddressName: 'Mike Gulline',
      shippingAddressCompanyName: '',
      shippingAddressAddress1: '7624 Potter Valley Dr.',
      shippingAddressAddress2: '',
      shippingAddressCity: 'Eastvale',
      shippingAddressCountry: 'USA',
      shippingAddressProvince: 'CA',
      shippingAddressPostalCode: '92880',
      shippingAddressPhone: '',
      totalWeight: 33.3,
    },
  };

  const { rates, errors } = await getRates(body);

  if (errors) return res.json({ errors });

  return res.json({ rates });
});

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
