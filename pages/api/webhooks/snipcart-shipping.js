import EasyPost from '@easypost/api';
import nc from 'next-connect';
// import DB connection

// use TEST API KEY
const API_KEY = process.env.EASYPOST_API_TEST;

// use PRODUCTION API KEY
// const API_KEY = process.env.EASYPOST_API

const handler = nc();

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

  // get rates or errors
  const { rates, errors } = await getRates(body);

  // return errors
  if (errors) {
    return res.json({ errors });
  }

  // return rates
  return res.json({ rates });
});

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

async function getRates(body) {
  // convert Snipcart vars to EasyPost vars with defaults
  const {
    eventName = '',
    content: {
      shippingAddressName: name = '',
      shippingAddressCompanyName: company = '',
      shippingAddressAddress1: street1 = '',
      shippingAddressAddress2: street2 = '',
      shippingAddressCity: city = '',
      shippingAddressCountry: country = '',
      shippingAddressProvince: state = '',
      shippingAddressPostalCode: zip = '',
      shippingAddressPhone: phone = '',
      totalWeight: weight = 33.3,
      token,
    },
  } = body;

  // try to get rates
  try {
    // init EasyPost API
    const api = new EasyPost(API_KEY);

    // build shipment
    const shipment = new api.Shipment({
      from_address: {
        street1: '417 MONTGOMERY ST',
        street2: 'FLOOR 5',
        city: 'SAN FRANCISCO',
        state: 'CA',
        zip: '94104',
        country: 'US',
        company: 'EasyPost',
        phone: '415-123-4567',
      },
      to_address: {
        name,
        company,
        street1,
        street2,
        city,
        country,
        state,
        zip,
        phone,
      },
      parcel: {
        weight: 33.3,
      },
    });

    const save = await shipment.save();
    // get lowest rate
    // const lowestRate = shipment.lowestRate();

    // map rates
    const rates = save.rates
      .map(
        ({
          id: rate_id,
          shipment_id,
          rate,
          service,
          carrier,
          delivery_days,
          est_delivery_days,
        }) => {
          const days = delivery_days || est_delivery_days || null;
          return {
            cost: Number(rate),
            description: `$${rate} shipping (${service} ${carrier}) ${
              days ? 'est. ' + days + ' days' : ''
            }`,
            rate_id,
            shipment_id,
            token,
          };
        }
      )
      .sort((a, b) => a.cost - b.cost)
      .slice(0, 4);

    return { rates, errors: null };
  } catch (errors) {
    return { rates: null, errors };
  }
}

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
