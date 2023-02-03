import EasyPost from '@easypost/api';
import nc from 'next-connect';

// use TEST API KEY
const API_KEY = process.env.EASYPOST_API_TEST;

// use PRODUCTION API KEY
// const API_KEY = process.env.EASYPOST_API

const handler = nc();

handler.post(async (req, res) => {
  // get rates or errors
  const { rates, errors } = await getRates(req.body);

  // return errors
  if (errors) {
    return res.json({ errors });
  }

  // return rates
  return res.json({ rates });
});

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

async function getRates(body) {
  // convert Snipcart vars to EasyPost vars
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
      totalWeight: weight = '',
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
        weight,
      },
    });

    // save shipment
    const save = await shipment.save();
    // get lowest rate
    const lowestRate = shipment.lowestRate();

    // map rates
    const rates = save.rates.map((rate) => {
      return {
        cost: Number(rate),
        description: `$${rate} shipping`,
      };
    });

    // return rates with no errors
    return res.json({ rates, errors: null });
  } catch (errors) {
    // return errors with no rates
    return res.json({ rates: null, errors });
  }
}

export default handler;
