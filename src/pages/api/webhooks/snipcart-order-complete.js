//Snipcart order complete webhook endpoint
//find rates in MongoDB
//purchase shipping from Easypost
//delete rates placeholder
//update Snipcart with shipping infos
//save orderToken, invoiceId, (more?) to MongoDB

import nc from 'next-connect';
import db from '@/utils/db';
import api from '@/utils/easyPostApi';
import Rate from '@/models/rate';
import Order from '@/models/order';
import mailError from '@/utils/mailError';
import updateOrderByToken from '@/utils/updateOrderByToken';

const handler = nc();

handler.post(async (req, res) => {
  const {
    eventName,
    content: {
      items,
      token,
      shippingFees,
      email,
      invoiceNumber,
      billingAddressName,
    },
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

    // delete rates
    try {
      await Rate.deleteMany({ orderToken: token });
    } catch (error) {
      throw { message: 'delete rates error', error };
    }

    // 3. get tracking url from api
    await new Promise((r) => setTimeout(r, 1000));

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
      await updateOrderByToken(token, trackingForSnipcart);
    } catch (error) {
      throw { message: 'save tracking info to snipcart error', error };
    }

    // save order token and invoice number to mongodb
    try {
      const saveItems = convertItems(items);
      await Order.create({
        invoiceNumber,
        email,
        name: billingAddressName,
        orderToken: token,
        parcel: shipping.parcel.id,
        from_address: shipping.from_address.id,
        to_address: shipping.to_address.id,
        tracker_id: shipping.tracker.id,
        items: saveItems,
      });
    } catch (error) {
      throw { message: 'save order token and invoice', error };
    }

    return res.json({ message: eventName, from: 'snipcart-order-complete' });
  } catch (error) {
    // ROOT CATCH
    await mailError(
      error,
      'snipcart-order-complete.js root catch',
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

//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////

// handler.get(async (req, res) => {
//   const {
//     content: { items, token, email, invoiceNumber },
//   } = smapleReq;
//   let saveItems;

//   try {
//     await db.connectDB();
//     saveItems = convertItems(items);
//     await Order.create({
//       invoiceNumber,
//       email,
//       orderToken: token,
//       parcel: '5',
//       from_address: '5',
//       to_address: '5',
//       tracker_id: '5',
//       items: saveItems,
//     });
//     await db.disconnectDB();
//   } catch (error) {
//     console.log(error);
//     throw { message: 'save order token and invoice', error };
//   }

//   console.log(saveItems);
//   return res.status(200).json({ good: 'job' });
// });

/////////////////
/////////////////
/////////////////

const convertItems = (items) =>
  items.map((item) => {
    const {
      name,
      price,
      quantity,
      url,
      id,
      description,
      categories,
      totalPriceWithoutTaxes,
      weight,
      image,
      originalPrice,
      uniqueId,
      totalPrice,
      totalWeight,
      taxes,
      unitPrice,
      totalPriceWithoutDiscountsAndTaxes,
    } = item;

    const baseId = convertId(id);
    return {
      name,
      price,
      quantity,
      url,
      id,
      baseId,
      description,
      categories,
      totalPriceWithoutTaxes,
      weight,
      image,
      originalPrice,
      uniqueId,
      totalPrice,
      totalWeight,
      taxes,
      unitPrice,
      totalPriceWithoutDiscountsAndTaxes,
    };
  });
const convertId = (id) => {
  const splitId = id.split(':');
  splitId.splice(-2, 1);
  return splitId.join(':');
};

export default handler;

// const smapleReq = {
//   eventName: 'order.completed',
//   mode: 'Live',
//   createdOn: '2023-06-07T00:06:39.4823307Z',
//   content: {
//     discounts: [],
//     items: [
//       {
//         paymentSchedule: {
//           interval: 0,
//           intervalCount: 1,
//           trialPeriodInDays: null,
//           startsOn: '2023-06-07T00:00:00Z',
//         },
//         pausingAction: 'None',
//         cancellationAction: 'None',
//         token: 'e8fbc04d-9f96-40fb-b517-ae8cf9adc7b7',
//         name: 'Original Long-Sleeve with Arch Design (Black) XL',
//         price: 35,
//         quantity: 1,
//         fileGuid: null,
//         url: 'https://www.loyaltofew.com/store/mens/sleeves/arch/black',
//         id: 'mens:sleeves:black:arch:xl',
//         initialData: '',
//         description: 'Original Long-Sleeve with Arch Design (Black) XL',
//         categories: [],
//         totalPriceWithoutTaxes: 35,
//         weight: 9.8,
//         image: '/images/products/mens/sleeves/MensSleevesArchBlack.jpg',
//         originalPrice: null,
//         uniqueId: '51930be1-16d4-4b8f-a6cd-3ed051fe4781',
//         stackable: true,
//         minQuantity: null,
//         maxQuantity: null,
//         addedOn: '2023-06-07T00:04:24Z',
//         modificationDate: '2023-06-07T00:04:24Z',
//         shippable: true,
//         taxable: true,
//         duplicatable: false,
//         width: null,
//         height: null,
//         length: null,
//         metadata: null,
//         totalPrice: 35,
//         totalWeight: 9.8,
//         taxes: [],
//         alternatePrices: {},
//         customFields: [],
//         unitPrice: 35,
//         hasDimensions: false,
//         parcels: null,
//         hasTaxesIncluded: false,
//         totalPriceWithoutDiscountsAndTaxes: 35,
//       },
//       {
//         paymentSchedule: {
//           interval: 0,
//           intervalCount: 1,
//           trialPeriodInDays: null,
//           startsOn: '2023-06-07T00:00:00Z',
//         },
//         pausingAction: 'None',
//         cancellationAction: 'None',
//         token: 'e8fbc04d-9f96-40fb-b517-ae8cf9adc7b7',
//         name: 'Original Oversized Crop with Arch Design (Black) One Size Fits Most',
//         price: 32,
//         quantity: 1,
//         fileGuid: null,
//         url: 'https://www.loyaltofew.com/store/womens/oversized-crop/arch/black',
//         id: 'womens:oversized-crop:black:arch:one-size-fits-most',
//         initialData: '',
//         description:
//           'Original Oversized Crop with Arch Design (Black) One Size Fits Most',
//         categories: [],
//         totalPriceWithoutTaxes: 32,
//         weight: 2.9,
//         image:
//           '/images/products/womens/oversized-crop/WomensOversized-CropArchBlack.jpg',
//         originalPrice: null,
//         uniqueId: 'cf394c02-fad4-4d24-aaaa-8d17a7fa4023',
//         stackable: true,
//         minQuantity: null,
//         maxQuantity: null,
//         addedOn: '2023-06-07T00:05:33Z',
//         modificationDate: '2023-06-07T00:05:33Z',
//         shippable: true,
//         taxable: true,
//         duplicatable: false,
//         width: null,
//         height: null,
//         length: null,
//         metadata: null,
//         totalPrice: 32,
//         totalWeight: 2.9,
//         taxes: [],
//         alternatePrices: {},
//         customFields: [],
//         unitPrice: 32,
//         hasDimensions: false,
//         parcels: null,
//         hasTaxesIncluded: false,
//         totalPriceWithoutDiscountsAndTaxes: 32,
//       },
//     ],
//     plans: [],
//     refunds: [],
//     taxes: [
//       {
//         taxName: 'Sales Tax',
//         taxRate: 0.0825,
//         amount: 6.01,
//         numberForInvoice: '',
//         includedInPrice: false,
//         appliesOnShipping: true,
//         discountInducedAmountVariation: 0,
//       },
//     ],
//     user: {
//       id: '2b119c6f-53a3-4d27-9d17-edadb08353d2',
//       email: 'gabbie.noel@gmail.com',
//       mode: 'Live',
//       statistics: {
//         ordersCount: 0,
//         ordersAmount: null,
//         subscriptionsCount: 0,
//       },
//       creationDate: '2023-06-07T00:06:34.187Z',
//       billingAddressFirstName: null,
//       billingAddressName: 'Gabriella Noel',
//       billingAddressCompanyName: null,
//       billingAddressAddress1: '7084 Camino Degrazia',
//       billingAddressAddress2: '246',
//       billingAddressCity: 'San Diego',
//       billingAddressCountry: 'US',
//       billingAddressProvince: 'CA',
//       billingAddressPostalCode: '92111',
//       billingAddressPhone: '',
//       shippingAddressFirstName: null,
//       shippingAddressName: 'Gabriella Noel',
//       shippingAddressCompanyName: null,
//       shippingAddressAddress1: '7084 Camino Degrazia',
//       shippingAddressAddress2: '246',
//       shippingAddressCity: 'San Diego',
//       shippingAddressCountry: 'US',
//       shippingAddressProvince: 'CA',
//       shippingAddressPostalCode: '92111',
//       shippingAddressPhone: '',
//       shippingAddressSameAsBilling: true,
//       status: 'Unconfirmed',
//       sessionToken: null,
//       gravatarUrl:
//         'https://www.gravatar.com/avatar/aca662c4819e1a1dc2128c5def5d0b35?s=70&d=https%3a%2f%2fcdn.snipcart.com%2fassets%2fimages%2favatar.jpg',
//       billingAddress: {
//         fullName: 'Gabriella Noel',
//         firstName: null,
//         name: 'Gabriella Noel',
//         company: null,
//         address1: '7084 Camino Degrazia',
//         address2: '246',
//         fullAddress: '7084 Camino Degrazia, 246',
//         city: 'San Diego',
//         country: 'US',
//         postalCode: '92111',
//         province: 'CA',
//         phone: '',
//         vatNumber: null,
//         hasMinimalRequiredInfo: true,
//         validationErrors: {},
//       },
//       shippingAddress: {
//         fullName: 'Gabriella Noel',
//         firstName: null,
//         name: 'Gabriella Noel',
//         company: null,
//         address1: '7084 Camino Degrazia',
//         address2: '246',
//         fullAddress: '7084 Camino Degrazia, 246',
//         city: 'San Diego',
//         country: 'US',
//         postalCode: '92111',
//         province: 'CA',
//         phone: '',
//         vatNumber: null,
//         hasMinimalRequiredInfo: true,
//         validationErrors: {},
//       },
//     },
//     token: 'e8fbc04d-9f96-40fb-b517-ae8cf9adc7b7',
//     isRecurringOrder: false,
//     isRecurringV3Order: false,
//     parentToken: null,
//     parentInvoiceNumber: null,
//     subscriptionId: null,
//     currency: 'usd',
//     creationDate: '2023-06-07T00:04:24Z',
//     modificationDate: '2023-06-07T00:06:36Z',
//     recoveredFromCampaignId: null,
//     status: 'Processed',
//     paymentStatus: 'Paid',
//     email: 'gabbie.noel@gmail.com',
//     willBePaidLater: false,
//     billingAddress: {
//       fullName: 'Gabriella Noel',
//       firstName: null,
//       name: 'Gabriella Noel',
//       company: null,
//       address1: '7084 Camino Degrazia',
//       address2: '246',
//       fullAddress: '7084 Camino Degrazia, 246',
//       city: 'San Diego',
//       country: 'US',
//       postalCode: '92111',
//       province: 'CA',
//       phone: '',
//       vatNumber: null,
//       hasMinimalRequiredInfo: true,
//       validationErrors: {},
//     },
//     shippingAddress: {
//       fullName: 'Gabriella Noel',
//       firstName: null,
//       name: 'Gabriella Noel',
//       company: null,
//       address1: '7084 Camino Degrazia',
//       address2: '246',
//       fullAddress: '7084 Camino Degrazia, 246',
//       city: 'San Diego',
//       country: 'US',
//       postalCode: '92111',
//       province: 'CA',
//       phone: '',
//       vatNumber: null,
//       hasMinimalRequiredInfo: true,
//       validationErrors: {},
//     },
//     shippingAddressSameAsBilling: true,
//     creditCardLast4Digits: '0793',
//     trackingNumber: null,
//     trackingUrl: null,
//     shippingFees: 5.85,
//     shippingProvider: null,
//     shippingMethod: '$5.85 shipping (First USPS) est. 2 days',
//     shippingLocalizedMethod: '$5.85 shipping (First USPS) est. 2 days',
//     cardHolderName: null,
//     paymentMethod: 'CreditCard',
//     notes: null,
//     mode: 'Live',
//     customFieldsJson: '[]',
//     userId: '2b119c6f-53a3-4d27-9d17-edadb08353d2',
//     completionDate: '2023-06-07T00:06:36Z',
//     cardType: 'Visa',
//     paymentGatewayUsed: 'SnipcartPaymentService',
//     paymentDetails: {
//       iconUrl: null,
//       display: null,
//       instructions: null,
//     },
//     taxProvider: 'Default',
//     lang: 'en',
//     refundsAmount: 0,
//     adjustedAmount: 78.86,
//     finalGrandTotal: 78.86,
//     billingAddressFirstName: null,
//     billingAddressName: 'Gabriella Noel',
//     billingAddressCompanyName: null,
//     billingAddressAddress1: '7084 Camino Degrazia',
//     billingAddressAddress2: '246',
//     billingAddressCity: 'San Diego',
//     billingAddressCountry: 'US',
//     billingAddressProvince: 'CA',
//     billingAddressPostalCode: '92111',
//     billingAddressPhone: '',
//     shippingAddressFirstName: null,
//     shippingAddressName: 'Gabriella Noel',
//     shippingAddressCompanyName: null,
//     shippingAddressAddress1: '7084 Camino Degrazia',
//     shippingAddressAddress2: '246',
//     shippingAddressCity: 'San Diego',
//     shippingAddressCountry: 'US',
//     shippingAddressProvince: 'CA',
//     shippingAddressPostalCode: '92111',
//     shippingAddressPhone: '',
//     totalNumberOfItems: 0,
//     invoiceNumber: 'LTF1019',
//     billingAddressComplete: true,
//     shippingAddressComplete: true,
//     shippingMethodComplete: true,
//     savedAmount: 0,
//     subtotal: 67,
//     baseTotal: 78.86,
//     itemsTotal: 67,
//     totalPriceWithoutDiscountsAndTaxes: 67,
//     taxableTotal: 67,
//     grandTotal: 78.86,
//     total: 78.86,
//     totalWeight: 12.7,
//     totalRebateRate: 0,
//     customFields: [],
//     shippingEnabled: true,
//     numberOfItemsInOrder: 2,
//     paymentTransactionId: 'ch_3NG9tDGiJhTY9z5G0OWdvx2P',
//     metadata: null,
//     taxesTotal: 6.01,
//     itemsCount: 2,
//     summary: {
//       subtotal: 67,
//       taxableTotal: 67,
//       total: 78.86,
//       payableNow: 78.86,
//       paymentMethod: 'CreditCard',
//       taxes: [
//         {
//           taxId: null,
//           name: 'Sales Tax',
//           rate: 0.0825,
//           amount: 6.01,
//           unroundedAmount: 6.01,
//           numberForInvoice: '',
//           includedInPrice: false,
//           appliesOnShipping: true,
//           discountInducedAmountVariation: 0,
//         },
//       ],
//       discountInducedTaxesVariation: 0,
//       adjustedTotal: 78.86,
//       shipping: null,
//     },
//     ipAddress: '76.33.18.133',
//     userAgent:
//       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
//     hasSubscriptions: false,
//   },
// };
