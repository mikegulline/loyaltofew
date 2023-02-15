import nc from 'next-connect';
import db from '../../../utils/db';
// import Order from '../../../models/order';
import Rate from '../../../models/rate';
import Shipping from '../../../models/shipping';
import api from './utils/easyPostApi';
import axios from 'axios';

const handler = nc();

handler.post(async (req, res) => {
  const saveOrder = { ...req.body };

  if (saveOrder.eventName === 'order.completed') {
    let rates;
    let shipping;
    let tracking;
    // get saved rates by orderToken and cost from db
    try {
      db.connectDB();
      rates = await Rate.find({
        orderToken: saveOrder.content.token,
        cost: saveOrder.content.shippingFees,
      }).exec();
      db.disconnectDB();
      if (!rates?.length) {
        return res.status(500).json({ errors: 'could not find rates' });
      }

      console.log('1. got rates from db ->', rates[0]);
    } catch (errors) {
      return res.status(500).json({ message: 'db error', errors });
    }

    // buy shipping
    try {
      const shipment = await api.Shipment.retrieve(rates[0].shipment_id);

      shipping = await shipment.buy(rates[0].rate_id);

      console.log('2. bought shipping from easypost ->', shipping);
    } catch (errors) {
      return res.status(500).json({ message: 'shipping errors', errors });
    }

    // save ship infos to db
    try {
      await db.connectDB();
      await new Shipping(shipping).save();
      console.log('3. saved shipping to db')
      await db.disconnectDB();
    } catch (errors) {
      res.status(500).json({ message: 'error saving shipment to db', errors });
    }

    // get tracking url from api
    try {
      tracking = await api.Tracker.retrieve(shipping.tracker.id);

      console.log('4. got tracking info from ep api ->', tracking);
    } catch (errors) {
      res.status(500).json({ message: 'error getting tracking url', errors });
    }

    // convert tracking vars
    const trackingForSnipcart = {
      status: 'Processed',
      trackingNumber: shipping.tracking_code,
      trackingUrl: tracking.public_url,
      metadata: {
        trackerId: shipping.tracker.id,
        carrier: tracking.carrierl,
        postageLabel: shipping.postage_label,
        selectedRate: shipping.selected_rate,
      },
    };

    // save tracking info to snipcart
    try {
      const secret = process.env.SNIPCART_SECRET + ':';
      const saveToSnipcart = await axios.put(
        `https://app.snipcart.com/api/orders/${saveOrder.content.token}`,
        trackingForSnipcart,
        {
          headers: {
            Authorization: `Basic ${btoa(secret)}`,
            Accept: 'application/json',
          },
        }
      );

      console.log('5. saved tracking to snipcart', saveToSnipcart);
    } catch (errors) {
      res
        .status(500)
        .json({ message: 'problem saving tracking to snipcart', errors });
    }
  }

  return res.json({ message: 'success' });
});

//get test//////////////////////////
//get test//////////////////////////
//get test//////////////////////////
//get test//////////////////////////
//get test//////////////////////////

// handler.get(async (req, res) => {
//   const saveOrder = {
//     eventName: 'order.completed',
//     mode: 'Test',
//     createdOn: '2023-02-15T01:27:15.3334304Z',
//     content: {
//       discounts: [],
//       items: [
//         {
//           paymentSchedule: {
//             interval: 0,
//             intervalCount: 1,
//             trialPeriodInDays: null,
//             startsOn: '2023-02-15T00:00:00Z',
//           },
//           pausingAction: 'None',
//           cancellationAction: 'None',
//           token: '2566bb42-376e-4db1-9e5b-ac163b5f4564',
//           name: 'Cotton Long-Sleeve with Round Design (Navy) S',
//           price: 35,
//           quantity: 1,
//           fileGuid: null,
//           url: 'https://loyaltofew-staging.vercel.app/store/mens/sleeves/round/navy?s=0',
//           id: 'menssleevesroundnavy:s',
//           initialData: '',
//           description: 'Cotton Long-Sleeve with Round Design (Navy) S',
//           categories: [],
//           totalPriceWithoutTaxes: 35,
//           weight: 9.8,
//           image: '/images/products/mens/sleeves/MensSleevesRoundNavy.jpg',
//           originalPrice: null,
//           uniqueId: '8cc975b0-19ad-450f-9f01-6b49cbba867e',
//           stackable: true,
//           minQuantity: null,
//           maxQuantity: null,
//           addedOn: '2023-02-15T00:34:56Z',
//           modificationDate: '2023-02-15T00:34:56Z',
//           shippable: true,
//           taxable: true,
//           duplicatable: false,
//           width: null,
//           height: null,
//           length: null,
//           metadata: null,
//           totalPrice: 35,
//           totalWeight: 9.8,
//           taxes: [],
//           alternatePrices: {},
//           customFields: [],
//           unitPrice: 35,
//           hasDimensions: false,
//           parcels: null,
//           hasTaxesIncluded: false,
//           totalPriceWithoutDiscountsAndTaxes: 35,
//         },
//       ],
//       plans: [],
//       refunds: [],
//       taxes: [],
//       user: {
//         id: 'b34fbdb2-f716-4618-b198-18820acac954',
//         email: 'mike@mikegulline.com',
//         mode: 'Test',
//         statistics: {
//           ordersCount: 0,
//           ordersAmount: null,
//           subscriptionsCount: 0,
//         },
//         creationDate: '2023-02-09T01:00:48Z',
//         billingAddressFirstName: null,
//         billingAddressName: 'Mike Gulline',
//         billingAddressCompanyName: null,
//         billingAddressAddress1: '7624 Potter Valley Drive',
//         billingAddressAddress2: '',
//         billingAddressCity: 'Corona',
//         billingAddressCountry: 'US',
//         billingAddressProvince: 'CA',
//         billingAddressPostalCode: '92880',
//         billingAddressPhone: '',
//         shippingAddressFirstName: null,
//         shippingAddressName: 'Mike Gulline',
//         shippingAddressCompanyName: null,
//         shippingAddressAddress1: '7624 Potter Valley Drive',
//         shippingAddressAddress2: '',
//         shippingAddressCity: 'Corona',
//         shippingAddressCountry: 'US',
//         shippingAddressProvince: 'CA',
//         shippingAddressPostalCode: '92880',
//         shippingAddressPhone: '',
//         shippingAddressSameAsBilling: false,
//         status: 'Unconfirmed',
//         sessionToken: null,
//         gravatarUrl:
//           'https://www.gravatar.com/avatar/9248356a37f4f5912915ff0d0ecab455?s=70&d=https%3a%2f%2fcdn.snipcart.com%2fassets%2fimages%2favatar.jpg',
//         billingAddress: {
//           fullName: 'Mike Gulline',
//           firstName: null,
//           name: 'Mike Gulline',
//           company: null,
//           address1: '7624 Potter Valley Drive',
//           address2: '',
//           fullAddress: '7624 Potter Valley Drive',
//           city: 'Corona',
//           country: 'US',
//           postalCode: '92880',
//           province: 'CA',
//           phone: '',
//           vatNumber: null,
//           hasMinimalRequiredInfo: true,
//           validationErrors: {},
//         },
//         shippingAddress: {
//           fullName: 'Mike Gulline',
//           firstName: null,
//           name: 'Mike Gulline',
//           company: null,
//           address1: '7624 Potter Valley Drive',
//           address2: '',
//           fullAddress: '7624 Potter Valley Drive',
//           city: 'Corona',
//           country: 'US',
//           postalCode: '92880',
//           province: 'CA',
//           phone: '',
//           vatNumber: null,
//           hasMinimalRequiredInfo: true,
//           validationErrors: {},
//         },
//       },
//       token: '2566bb42-376e-4db1-9e5b-ac163b5f4564',
//       isRecurringOrder: false,
//       isRecurringV3Order: false,
//       parentToken: null,
//       parentInvoiceNumber: null,
//       subscriptionId: null,
//       currency: 'usd',
//       creationDate: '2023-02-15T00:34:56Z',
//       modificationDate: '2023-02-15T00:35:54Z',
//       recoveredFromCampaignId: null,
//       status: 'Processed',
//       paymentStatus: 'Paid',
//       email: 'mike@mikegulline.com',
//       willBePaidLater: false,
//       billingAddress: {
//         fullName: 'Mike Gulline',
//         firstName: null,
//         name: 'Mike Gulline',
//         company: null,
//         address1: '7624 Potter Valley Drive',
//         address2: '',
//         fullAddress: '7624 Potter Valley Drive',
//         city: 'Corona',
//         country: 'US',
//         postalCode: '92880',
//         province: 'CA',
//         phone: '',
//         vatNumber: null,
//         hasMinimalRequiredInfo: true,
//         validationErrors: {},
//       },
//       shippingAddress: {
//         fullName: 'Mike Gulline',
//         firstName: null,
//         name: 'Mike Gulline',
//         company: null,
//         address1: '7624 Potter Valley Drive',
//         address2: '',
//         fullAddress: '7624 Potter Valley Drive',
//         city: 'Corona',
//         country: 'US',
//         postalCode: '92880',
//         province: 'CA',
//         phone: '',
//         vatNumber: null,
//         hasMinimalRequiredInfo: true,
//         validationErrors: {},
//       },
//       shippingAddressSameAsBilling: true,
//       creditCardLast4Digits: '4242',
//       trackingNumber: null,
//       trackingUrl: null,
//       shippingFees: 4.81,
//       shippingProvider: null,
//       shippingMethod: '$4.81 shipping (First USPS) est. 3 days',
//       shippingLocalizedMethod: '$4.81 shipping (First USPS) est. 3 days',
//       cardHolderName: 'Mike Gulline',
//       paymentMethod: 'CreditCard',
//       notes: null,
//       mode: 'Test',
//       customFieldsJson: '[]',
//       userId: 'b34fbdb2-f716-4618-b198-18820acac954',
//       completionDate: '2023-02-15T00:35:54Z',
//       cardType: 'Visa',
//       paymentGatewayUsed: 'SnipcartPaymentService',
//       paymentDetails: {
//         iconUrl: null,
//         display: null,
//         instructions: null,
//       },
//       taxProvider: 'Default',
//       lang: 'en',
//       refundsAmount: 0,
//       adjustedAmount: 39.81,
//       finalGrandTotal: 39.81,
//       billingAddressFirstName: null,
//       billingAddressName: 'Mike Gulline',
//       billingAddressCompanyName: null,
//       billingAddressAddress1: '7624 Potter Valley Drive',
//       billingAddressAddress2: '',
//       billingAddressCity: 'Corona',
//       billingAddressCountry: 'US',
//       billingAddressProvince: 'CA',
//       billingAddressPostalCode: '92880',
//       billingAddressPhone: '',
//       shippingAddressFirstName: null,
//       shippingAddressName: 'Mike Gulline',
//       shippingAddressCompanyName: null,
//       shippingAddressAddress1: '7624 Potter Valley Drive',
//       shippingAddressAddress2: '',
//       shippingAddressCity: 'Corona',
//       shippingAddressCountry: 'US',
//       shippingAddressProvince: 'CA',
//       shippingAddressPostalCode: '92880',
//       shippingAddressPhone: '',
//       totalNumberOfItems: 0,
//       invoiceNumber: 'LTF1017',
//       billingAddressComplete: true,
//       shippingAddressComplete: true,
//       shippingMethodComplete: true,
//       savedAmount: 0,
//       subtotal: 35,
//       baseTotal: 39.81,
//       itemsTotal: 35,
//       totalPriceWithoutDiscountsAndTaxes: 35,
//       taxableTotal: 35,
//       grandTotal: 39.81,
//       total: 39.81,
//       totalWeight: 9.8,
//       totalRebateRate: 0,
//       customFields: [],
//       shippingEnabled: true,
//       numberOfItemsInOrder: 1,
//       paymentTransactionId: '83d52ece-438f-463f-b1eb-8305e5f8b622',
//       metadata: null,
//       taxesTotal: 0,
//       itemsCount: 1,
//       summary: {
//         subtotal: 35,
//         taxableTotal: 35,
//         total: 39.81,
//         payableNow: 39.81,
//         paymentMethod: 'CreditCard',
//         taxes: [],
//         discountInducedTaxesVariation: 0,
//         adjustedTotal: 39.81,
//         shipping: null,
//       },
//       ipAddress: '99.8.112.175',
//       userAgent:
//         'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0',
//       hasSubscriptions: false,
//     },
//   };

//   if (saveOrder.eventName === 'order.completed') {
//     let rates;
//     let shipping;
//     let tracking;
//     // get saved rates by orderToken and cost from db
//     try {
//       db.connectDB();
//       rates = await Rate.find({
//         orderToken: saveOrder.content.token,
//         cost: saveOrder.content.shippingFees,
//       }).exec();
//       db.disconnectDB();
//       if (!rates?.length) {
//         return res.status(500).json({ errors: 'could not find rates' });
//       }

//       console.log('found rates, now buy shipping', rates[0]);
//     } catch (errors) {
//       return res.status(500).json({ message: 'db error', errors });
//     }

//     // buy shipping
//     try {
//       const shipment = await api.Shipment.retrieve(rates[0].shipment_id);

//       shipping = await shipment.buy(rates[0].rate_id);

//       console.log('bought shipping from easypost', shipping);
//     } catch (errors) {
//       return res.status(500).json({ message: 'shipping errors', errors });
//     }

//     // save ship infos to db
//     try {
//       await db.connectDB();
//       await new Shipping(shipping).save();
//       await db.disconnectDB();
//     } catch (errors) {
//       res.status(500).json({ message: 'error saving shipment to db', errors });
//     }

//     // get tracking url from api
//     try {
//       tracking = await api.Tracker.retrieve(shipping.tracker.id);

//       console.log('tracking info retrieved from ep api', tracking);
//     } catch (errors) {
//       res.status(500).json({ message: 'error getting tracking url', errors });
//     }

//     // convert tracking vars
//     const trackingForSnipcart = {
//       status: 'Processed',
//       trackingNumber: shipping.tracking_code,
//       trackingUrl: tracking.public_url,
//       metadata: {
//         trackerId: shipping.tracker.id,
//         carrier: tracking.carrierl,
//         postageLabel: shipping.postage_label,
//         selectedRate: shipping.selected_rate,
//       },
//     };

//     // save tracking info to snipcart
//     try {
//       const secret = process.env.SNIPCART_SECRET + ':';
//       const saveToSnipcart = await axios.put(
//         `https://app.snipcart.com/api/orders/${saveOrder.content.token}`,
//         trackingForSnipcart,
//         {
//           headers: {
//             Authorization: `Basic ${btoa(secret)}`,
//             Accept: 'application/json',
//           },
//         }
//       );

//       console.log('save tracking to snipcart', saveToSnipcart);
//     } catch (errors) {
//       res
//         .status(500)
//         .json({ message: 'problem saving tracking to snipcart', errors });
//     }

//     ///
//     // save order to db
//     try {
//       await db.connectDB();

//       saveOrder.content.trackingNumber = shipping.tracking_code;
//       saveOrder.content.trackingUrl = tracking.public_url;

//       const order = await new Order(saveOrder).save();
//       res.json({ message: 'saved order to db', order });

//       await db.disconnectDB();
//     } catch (errors) {
//       res.status(500).json({ errors });
//     }
//   }

//   return res.status(200);
// });

export default handler;

// object returned from easypost after shipping purchaced
// const buyShippingResp = {
//   id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//   object: 'Shipment',
//   mode: 'test',
//   created_at: '2023-02-11T22:53:41Z',
//   updated_at: '2023-02-11T23:52:39Z',
//   to_address: {
//     id: 'adr_ee162327aa5e11ed9dd3ac1f6bc72124',
//   },
//   from_address: {
//     id: 'adr_ee18b862aa5e11edb390ac1f6bc7bdc6',
//   },
//   return_address: {
//     id: 'adr_ee18b862aa5e11edb390ac1f6bc7bdc6',
//   },
//   buyer_address: {
//     id: 'adr_ee162327aa5e11ed9dd3ac1f6bc72124',
//   },
//   parcel: {
//     id: 'prcl_a599d61a514843c896deb535645cddf4',
//   },
//   forms: [],
//   rates: [
//     {
//       id: 'rate_6013190ba2bb41daa775b4ffb4b86142',
//       object: 'Rate',
//       created_at: '2023-02-11T22:53:43Z',
//       updated_at: '2023-02-11T22:53:43Z',
//       mode: 'test',
//       service: 'First',
//       carrier: 'USPS',
//       rate: '4.15',
//       currency: 'USD',
//       retail_rate: '5.60',
//       retail_currency: 'USD',
//       list_rate: '4.15',
//       list_currency: 'USD',
//       billing_type: 'easypost',
//       delivery_days: 3,
//       delivery_date: null,
//       delivery_date_guaranteed: false,
//       est_delivery_days: 3,
//       shipment_id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//       carrier_account_id: 'ca_c96ca3ce49094b3795fe439c3f95d39f',
//     },
//     {
//       id: 'rate_312f49175f0f4bd5a69a0dcfca996c35',
//       object: 'Rate',
//       created_at: '2023-02-11T22:53:43Z',
//       updated_at: '2023-02-11T22:53:43Z',
//       mode: 'test',
//       service: 'Express',
//       carrier: 'USPS',
//       rate: '27.35',
//       currency: 'USD',
//       retail_rate: '31.20',
//       retail_currency: 'USD',
//       list_rate: '27.35',
//       list_currency: 'USD',
//       billing_type: 'easypost',
//       delivery_days: null,
//       delivery_date: null,
//       delivery_date_guaranteed: false,
//       est_delivery_days: null,
//       shipment_id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//       carrier_account_id: 'ca_c96ca3ce49094b3795fe439c3f95d39f',
//     },
//     {
//       id: 'rate_f748cbb88c7f46c28f4f01a8b00a2146',
//       object: 'Rate',
//       created_at: '2023-02-11T22:53:43Z',
//       updated_at: '2023-02-11T22:53:43Z',
//       mode: 'test',
//       service: 'ParcelSelect',
//       carrier: 'USPS',
//       rate: '7.75',
//       currency: 'USD',
//       retail_rate: '7.75',
//       retail_currency: 'USD',
//       list_rate: '7.75',
//       list_currency: 'USD',
//       billing_type: 'easypost',
//       delivery_days: 5,
//       delivery_date: null,
//       delivery_date_guaranteed: false,
//       est_delivery_days: 5,
//       shipment_id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//       carrier_account_id: 'ca_c96ca3ce49094b3795fe439c3f95d39f',
//     },
//     {
//       id: 'rate_1f966383722d47f7875648b70c07d182',
//       object: 'Rate',
//       created_at: '2023-02-11T22:53:43Z',
//       updated_at: '2023-02-11T22:53:43Z',
//       mode: 'test',
//       service: 'Priority',
//       carrier: 'USPS',
//       rate: '7.58',
//       currency: 'USD',
//       retail_rate: '10.20',
//       retail_currency: 'USD',
//       list_rate: '8.24',
//       list_currency: 'USD',
//       billing_type: 'easypost',
//       delivery_days: 2,
//       delivery_date: null,
//       delivery_date_guaranteed: false,
//       est_delivery_days: 2,
//       shipment_id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//       carrier_account_id: 'ca_c96ca3ce49094b3795fe439c3f95d39f',
//     },
//     {
//       id: 'rate_bc3dcd7305a747098688719537e76650',
//       object: 'Rate',
//       created_at: '2023-02-11T22:53:43Z',
//       updated_at: '2023-02-11T22:53:43Z',
//       mode: 'test',
//       service: '3DaySelect',
//       carrier: 'UPS',
//       rate: '29.22',
//       currency: 'USD',
//       retail_rate: '27.47',
//       retail_currency: 'USD',
//       list_rate: '27.07',
//       list_currency: 'USD',
//       billing_type: 'carrier',
//       delivery_days: 3,
//       delivery_date: '2023-02-16T23:00:00Z',
//       delivery_date_guaranteed: false,
//       est_delivery_days: 3,
//       shipment_id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//       carrier_account_id: 'ca_8a67eeb0159e4220af0e715f4998e902',
//     },
//     {
//       id: 'rate_f30ee30b7b97499e84b47b01794b9a79',
//       object: 'Rate',
//       created_at: '2023-02-11T22:53:43Z',
//       updated_at: '2023-02-11T22:53:43Z',
//       mode: 'test',
//       service: 'NextDayAirEarlyAM',
//       carrier: 'UPS',
//       rate: '132.02',
//       currency: 'USD',
//       retail_rate: '124.74',
//       retail_currency: 'USD',
//       list_rate: '125.38',
//       list_currency: 'USD',
//       billing_type: 'carrier',
//       delivery_days: 1,
//       delivery_date: '2023-02-13T08:00:00Z',
//       delivery_date_guaranteed: true,
//       est_delivery_days: 1,
//       shipment_id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//       carrier_account_id: 'ca_8a67eeb0159e4220af0e715f4998e902',
//     },
//     {
//       id: 'rate_f831158dab954634b958d38262500e10',
//       object: 'Rate',
//       created_at: '2023-02-11T22:53:43Z',
//       updated_at: '2023-02-11T22:53:43Z',
//       mode: 'test',
//       service: 'Ground',
//       carrier: 'UPS',
//       rate: '19.34',
//       currency: 'USD',
//       retail_rate: '12.76',
//       retail_currency: 'USD',
//       list_rate: '17.94',
//       list_currency: 'USD',
//       billing_type: 'carrier',
//       delivery_days: 3,
//       delivery_date: '2023-02-15T23:00:00Z',
//       delivery_date_guaranteed: false,
//       est_delivery_days: 3,
//       shipment_id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//       carrier_account_id: 'ca_8a67eeb0159e4220af0e715f4998e902',
//     },
//     {
//       id: 'rate_6528a298aea5421484656310c3df8838',
//       object: 'Rate',
//       created_at: '2023-02-11T22:53:43Z',
//       updated_at: '2023-02-11T22:53:43Z',
//       mode: 'test',
//       service: 'NextDayAirSaver',
//       carrier: 'UPS',
//       rate: '83.67',
//       currency: 'USD',
//       retail_rate: '80.25',
//       retail_currency: 'USD',
//       list_rate: '77.81',
//       list_currency: 'USD',
//       billing_type: 'carrier',
//       delivery_days: 1,
//       delivery_date: '2023-02-13T23:00:00Z',
//       delivery_date_guaranteed: true,
//       est_delivery_days: 1,
//       shipment_id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//       carrier_account_id: 'ca_8a67eeb0159e4220af0e715f4998e902',
//     },
//     {
//       id: 'rate_af22f17aec44447f9d2c84b5d44279d7',
//       object: 'Rate',
//       created_at: '2023-02-11T22:53:43Z',
//       updated_at: '2023-02-11T22:53:43Z',
//       mode: 'test',
//       service: 'NextDayAir',
//       carrier: 'UPS',
//       rate: '95.42',
//       currency: 'USD',
//       retail_rate: '88.14',
//       retail_currency: 'USD',
//       list_rate: '88.78',
//       list_currency: 'USD',
//       billing_type: 'carrier',
//       delivery_days: 1,
//       delivery_date: '2023-02-13T10:30:00Z',
//       delivery_date_guaranteed: true,
//       est_delivery_days: 1,
//       shipment_id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//       carrier_account_id: 'ca_8a67eeb0159e4220af0e715f4998e902',
//     },
//     {
//       id: 'rate_056a71f98e0d4de6ac02c4391cfc26c4',
//       object: 'Rate',
//       created_at: '2023-02-11T22:53:43Z',
//       updated_at: '2023-02-11T22:53:43Z',
//       mode: 'test',
//       service: '2ndDayAir',
//       carrier: 'UPS',
//       rate: '37.40',
//       currency: 'USD',
//       retail_rate: '35.58',
//       retail_currency: 'USD',
//       list_rate: '34.68',
//       list_currency: 'USD',
//       billing_type: 'carrier',
//       delivery_days: 2,
//       delivery_date: '2023-02-14T23:00:00Z',
//       delivery_date_guaranteed: false,
//       est_delivery_days: 2,
//       shipment_id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//       carrier_account_id: 'ca_8a67eeb0159e4220af0e715f4998e902',
//     },
//     {
//       id: 'rate_cd1e2451035e4363a0810e5918d54b05',
//       object: 'Rate',
//       created_at: '2023-02-11T22:53:43Z',
//       updated_at: '2023-02-11T22:53:43Z',
//       mode: 'test',
//       service: 'FIRST_OVERNIGHT',
//       carrier: 'FedEx',
//       rate: '144.73',
//       currency: 'USD',
//       retail_rate: null,
//       retail_currency: null,
//       list_rate: '144.73',
//       list_currency: 'USD',
//       billing_type: 'carrier',
//       delivery_days: 2,
//       delivery_date: '2023-02-13T08:00:00Z',
//       delivery_date_guaranteed: true,
//       est_delivery_days: 2,
//       shipment_id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//       carrier_account_id: 'ca_daf8afd63b7643b993ca8c2441155c0d',
//     },
//     {
//       id: 'rate_2f275919012144868436651258b882cf',
//       object: 'Rate',
//       created_at: '2023-02-11T22:53:43Z',
//       updated_at: '2023-02-11T22:53:43Z',
//       mode: 'test',
//       service: 'PRIORITY_OVERNIGHT',
//       carrier: 'FedEx',
//       rate: '67.59',
//       currency: 'USD',
//       retail_rate: null,
//       retail_currency: null,
//       list_rate: '106.91',
//       list_currency: 'USD',
//       billing_type: 'carrier',
//       delivery_days: 2,
//       delivery_date: '2023-02-13T10:30:00Z',
//       delivery_date_guaranteed: true,
//       est_delivery_days: 2,
//       shipment_id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//       carrier_account_id: 'ca_daf8afd63b7643b993ca8c2441155c0d',
//     },
//     {
//       id: 'rate_899a0720e9aa4f42a57c81a75200ea9d',
//       object: 'Rate',
//       created_at: '2023-02-11T22:53:43Z',
//       updated_at: '2023-02-11T22:53:43Z',
//       mode: 'test',
//       service: 'STANDARD_OVERNIGHT',
//       carrier: 'FedEx',
//       rate: '61.18',
//       currency: 'USD',
//       retail_rate: null,
//       retail_currency: null,
//       list_rate: '95.28',
//       list_currency: 'USD',
//       billing_type: 'carrier',
//       delivery_days: 2,
//       delivery_date: '2023-02-13T16:30:00Z',
//       delivery_date_guaranteed: true,
//       est_delivery_days: 2,
//       shipment_id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//       carrier_account_id: 'ca_daf8afd63b7643b993ca8c2441155c0d',
//     },
//     {
//       id: 'rate_2a01cee5f8bf49b2a169d4a7a40420da',
//       object: 'Rate',
//       created_at: '2023-02-11T22:53:43Z',
//       updated_at: '2023-02-11T22:53:43Z',
//       mode: 'test',
//       service: 'FEDEX_2_DAY_AM',
//       carrier: 'FedEx',
//       rate: '42.79',
//       currency: 'USD',
//       retail_rate: null,
//       retail_currency: null,
//       list_rate: '55.30',
//       list_currency: 'USD',
//       billing_type: 'carrier',
//       delivery_days: 3,
//       delivery_date: '2023-02-14T12:00:00Z',
//       delivery_date_guaranteed: true,
//       est_delivery_days: 3,
//       shipment_id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//       carrier_account_id: 'ca_daf8afd63b7643b993ca8c2441155c0d',
//     },
//     {
//       id: 'rate_c343a16d172f4a5da52870c106edf7e0',
//       object: 'Rate',
//       created_at: '2023-02-11T22:53:43Z',
//       updated_at: '2023-02-11T22:53:43Z',
//       mode: 'test',
//       service: 'FEDEX_2_DAY',
//       carrier: 'FedEx',
//       rate: '40.43',
//       currency: 'USD',
//       retail_rate: null,
//       retail_currency: null,
//       list_rate: '49.47',
//       list_currency: 'USD',
//       billing_type: 'carrier',
//       delivery_days: 3,
//       delivery_date: '2023-02-14T18:00:00Z',
//       delivery_date_guaranteed: true,
//       est_delivery_days: 3,
//       shipment_id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//       carrier_account_id: 'ca_daf8afd63b7643b993ca8c2441155c0d',
//     },
//     {
//       id: 'rate_cdd4ffbaa2d14cf5a58ff1de7399f548',
//       object: 'Rate',
//       created_at: '2023-02-11T22:53:43Z',
//       updated_at: '2023-02-11T22:53:43Z',
//       mode: 'test',
//       service: 'FEDEX_EXPRESS_SAVER',
//       carrier: 'FedEx',
//       rate: '39.32',
//       currency: 'USD',
//       retail_rate: null,
//       retail_currency: null,
//       list_rate: '46.24',
//       list_currency: 'USD',
//       billing_type: 'carrier',
//       delivery_days: 4,
//       delivery_date: '2023-02-15T16:30:00Z',
//       delivery_date_guaranteed: true,
//       est_delivery_days: 4,
//       shipment_id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//       carrier_account_id: 'ca_daf8afd63b7643b993ca8c2441155c0d',
//     },
//     {
//       id: 'rate_3ad29381f76944cdb3591ce9507b9cbf',
//       object: 'Rate',
//       created_at: '2023-02-11T22:53:43Z',
//       updated_at: '2023-02-11T22:53:43Z',
//       mode: 'test',
//       service: 'FEDEX_GROUND',
//       carrier: 'FedEx',
//       rate: '11.74',
//       currency: 'USD',
//       retail_rate: null,
//       retail_currency: null,
//       list_rate: '13.32',
//       list_currency: 'USD',
//       billing_type: 'carrier',
//       delivery_days: 2,
//       delivery_date: '2023-02-15T23:59:00Z',
//       delivery_date_guaranteed: true,
//       est_delivery_days: 2,
//       shipment_id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//       carrier_account_id: 'ca_daf8afd63b7643b993ca8c2441155c0d',
//     },
//   ],
//   selected_rate: {
//     id: 'rate_6013190ba2bb41daa775b4ffb4b86142',
//     object: 'Rate',
//     created_at: '2023-02-11T23:52:38Z',
//     updated_at: '2023-02-11T23:52:38Z',
//     mode: 'test',
//     service: 'First',
//     carrier: 'USPS',
//     rate: '4.15',
//     currency: 'USD',
//     retail_rate: '5.60',
//     retail_currency: 'USD',
//     list_rate: '4.15',
//     list_currency: 'USD',
//     billing_type: 'easypost',
//     delivery_days: 3,
//     delivery_date: null,
//     delivery_date_guaranteed: false,
//     est_delivery_days: 3,
//     shipment_id: 'shp_507c25c0d032463b9cd9b951a03ac38c',
//     carrier_account_id: 'ca_c96ca3ce49094b3795fe439c3f95d39f',
//   },
//   postage_label: {
//     object: 'PostageLabel',
//     id: 'pl_63e0bf33faa84637bd280670f61c10f3',
//     created_at: '2023-02-11T23:52:38Z',
//     updated_at: '2023-02-11T23:52:38Z',
//     date_advance: 0,
//     integrated_form: 'none',
//     label_date: '2023-02-11T23:52:38Z',
//     label_resolution: 300,
//     label_size: '4x6',
//     label_type: 'default',
//     label_file_type: 'image/png',
//     label_url:
//       'https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20230211/9f8e23255c3244ba93f9459288702964.png',
//     label_pdf_url: null,
//     label_zpl_url: null,
//     label_epl2_url: null,
//     label_file: null,
//   },
//   messages: [],
//   options: {
//     currency: 'USD',
//     payment: {
//       type: 'SENDER',
//     },
//     date_advance: 0,
//   },
//   tracking_code: '9400100104262179938664',
//   usps_zone: 4,
//   status: 'unknown',
//   tracker: {
//     id: 'trk_e5fecee479ed4e2493d3aa74c24760a2',
//   },
//   fees: [
//     {
//       object: 'Fee',
//       type: 'LabelFee',
//       amount: '0.00000',
//       charged: true,
//       refunded: false,
//     },
//     {
//       object: 'Fee',
//       type: 'PostageFee',
//       amount: '4.15000',
//       charged: true,
//       refunded: false,
//     },
//   ],
// };
// const trackerInfoFromEasyPost = {
//   _validationErrors: null,
//   id: 'trk_f587026874004e38811f662af3241599',
//   object: 'Tracker',
//   mode: 'test',
//   tracking_code: '9400100104262180742021',
//   status: 'pre_transit',
//   status_detail: 'status_update',
//   created_at: '2023-02-14T23:15:49Z',
//   updated_at: '2023-02-14T23:15:49Z',
//   signed_by: null,
//   weight: null,
//   est_delivery_date: '2023-02-14T23:15:49Z',
//   shipment_id: 'shp_d6b9f61e299a4c87af1957b12abbee62',
//   carrier: 'USPS',
//   tracking_details: [
//     {
//       object: 'TrackingDetail',
//       message: 'Pre-Shipment Info Sent to USPS',
//       description: null,
//       status: 'pre_transit',
//       status_detail: 'status_update',
//       datetime: '2023-01-14T23:15:49Z',
//       source: 'USPS',
//       carrier_code: null,
//       tracking_location: [Object],
//     },
//     {
//       object: 'TrackingDetail',
//       message: 'Shipping Label Created',
//       description: null,
//       status: 'pre_transit',
//       status_detail: 'status_update',
//       datetime: '2023-01-15T11:52:49Z',
//       source: 'USPS',
//       carrier_code: null,
//       tracking_location: [Object],
//     },
//   ],
//   fees: [],
//   carrier_detail: {
//     object: 'CarrierDetail',
//     service: 'First-Class Package Service',
//     container_type: null,
//     est_delivery_date_local: null,
//     est_delivery_time_local: null,
//     origin_location: 'HOUSTON TX, 77001',
//     origin_tracking_location: {
//       object: 'TrackingLocation',
//       city: 'HOUSTON',
//       state: 'TX',
//       country: null,
//       zip: '77063',
//     },
//     destination_location: 'CHARLESTON SC, 29401',
//     destination_tracking_location: null,
//     guaranteed_delivery_date: null,
//     alternate_identifier: null,
//     initial_delivery_attempt: null,
//   },
//   public_url:
//     'https://track.easypost.com/djE6dHJrX2Y1ODcwMjY4NzQwMDRlMzg4MTFmNjYyYWYzMjQxNTk5',
// };
