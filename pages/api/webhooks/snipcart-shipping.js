import EasyPost from '@easypost/api';
import nc from 'next-connect';

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
  // get rates or errors
  // const { rates, errors } = await getRates(req.body);

  const errors = null;
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
    },
  } = req.body;
  const rates = [
    {
      cost: 8.14,
      description: '$8.14 shipping ' + eventName,
    },
    {
      cost: 8.31,
      description: '$8.31 shipping ' + name,
    },
    {
      cost: 12.73,
      description: '$12.73 shipping ' + street1,
    },
    {
      cost: 19.68,
      description: '$19.68 shipping ' + city,
    },
    {
      cost: 20.78,
      description: '$20.78 shipping ' + country,
    },
    {
      cost: 21.93,
      description: '$21.93 shipping ' + zip,
    },
    {
      cost: 23.12,
      description: '$23.12 shipping ' + phone,
    },
    {
      cost: 33.16,
      description: '$33.16 shipping ' + weight,
    },
    {
      cost: 39.05,
      description: '$39.05 shipping ' + state,
    },
    {
      cost: 40.15,
      description: '$40.15 shipping',
    },
    {
      cost: 57.62,
      description: '$57.62 shipping',
    },
    {
      cost: 63.03,
      description: '$63.03 shipping',
    },
    {
      cost: 104.09,
      description: '$104.09 shipping',
    },
    {
      cost: 113.22,
      description: '$113.22 shipping',
    },
    {
      cost: 142.63,
      description: '$142.63 shipping',
    },
    {
      cost: 149.6,
      description: '$149.60 shipping',
    },
  ];

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
      totalWeight: weight = 33.3,
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

    // save shipment
    const save = await shipment.save();
    // get lowest rate
    const lowestRate = shipment.lowestRate();

    // map rates
    const rates = save.rates
      .map(({ rate }) => {
        return {
          cost: Number(rate),
          description: `$${rate} shipping`,
        };
      })
      .sort((a, b) => a.cost - b.cost);

    // return rates with no errors
    return { rates, errors: null };
  } catch (errors) {
    // return errors with no rates
    return { rates: null, errors };
  }
}

export default handler;
