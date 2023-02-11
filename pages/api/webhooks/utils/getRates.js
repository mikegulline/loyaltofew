import EasyPost from '@easypost/api';
import EP_API_KEY from './easyPostApi';

export default async function getRates(body) {
  const { token, to_address, from_address, parcel } = getVars(body);

  try {
    const api = new EasyPost(EP_API_KEY);

    const shipment = new api.Shipment({
      from_address,
      to_address,
      parcel,
    });

    const save = await shipment.save();

    const rates = returnRates(save.rates, token);

    return { rates, errors: null };
  } catch (errors) {
    return { rates: null, errors };
  }
}

//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////

const getVars = (body) => {
  const from_address = {
    street1: '417 MONTGOMERY ST',
    street2: 'FLOOR 5',
    city: 'SAN FRANCISCO',
    state: 'CA',
    zip: '94104',
    country: 'US',
    company: 'EasyPost',
    phone: '415-123-4567',
  };

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
      token = 'none',
    },
  } = body;

  const parcel = {
    weight,
  };

  return {
    eventName,
    token,
    weight,
    from_address,
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
    parcel,
  };
};

//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////

const returnRates = (rates, token) => {
  return rates
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
        const orderToken = token;
        const cost = Number(rate);
        const days = delivery_days || est_delivery_days || null;
        const description = `$${rate} shipping (${service} ${carrier}) ${
          days ? 'est. ' + days + ' days' : ''
        }`;
        return {
          cost,
          description,
          rate_id,
          shipment_id,
          orderToken,
        };
      }
    )
    .sort((a, b) => a.cost - b.cost)
    .slice(0, 4);
};
