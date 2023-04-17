import api from '@/utils/easyPostApi';

export default async function getRates(body) {
  const { token, to_address, from_address, parcel } = getVars(body);

  let shippingInfo = {
    from_address,
    to_address,
    parcel,
  };

  try {
    const shipment = new api.Shipment(shippingInfo);

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
    street1: process.env.CONTACT_STREET1,
    street2: process.env.CONTACT_STREET2,
    city: process.env.CONTACT_CITY,
    state: process.env.CONTACT_STATE,
    zip: process.env.CONTACT_ZIP,
    country: process.env.CONTACT_COUNTRY,
    company: process.env.CONTACT_COMPANY,
    phone: process.env.CONTACT_PHONE,
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
