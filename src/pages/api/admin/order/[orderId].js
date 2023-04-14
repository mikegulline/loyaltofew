// Get order info from Snipcart by InvoiceNumber
// Used in pages/admin/returns/
import nc from 'next-connect';
import axios from 'axios';
import getTokenByInvoiceNumber from '@/utils/getTokenByInvoiceNumber';

const handler = new nc();

handler.get(async (req, res) => {
  const { orderId: invoiceNumber } = req.query;
  const { orderToken, error } = await getTokenByInvoiceNumber(invoiceNumber);
  if (orderToken) {
    try {
      const secret = process.env.SNIPCART_SECRET + ':';
      const { data } = await axios.get(
        // `https://app.snipcart.com/api/orders?invoiceNumber=${invoiceNumber}`,
        `https://app.snipcart.com/api/orders/${orderToken}`,
        {
          headers: {
            Authorization: `Basic ${btoa(secret)}`,
            Accept: 'application/json',
          },
        }
      );
      return res.status(200).json({ error: null, order: data });
    } catch (error) {
      console.log({ error, message: 'problem getting order information' });
    }
  }
  return res.status(200).json({ error, order: null });
});

handler.put(async (req, res) => {
  const passData = req.body;
  const { orderId: token } = req.query;

  try {
    const secret = process.env.SNIPCART_SECRET + ':';
    const { data } = await axios.put(
      `https://app.snipcart.com/api/orders/${token}`,
      passData,
      {
        headers: {
          Authorization: `Basic ${btoa(secret)}`,
          Accept: 'application/json',
        },
      }
    );
    return res.status(200).json({ data });
  } catch (errors) {
    console.log({ passData, errors });
  }
});

export default handler;

// {
//       "discounts": [ ],
//       "items": [
//           {
//               "paymentSchedule": {
//                   "interval": 0,
//                   "intervalCount": 1,
//                   "trialPeriodInDays": null,
//                   "startsOn": "2023-04-03T00:00:00Z"
//               },
//               "pausingAction": "None",
//               "cancellationAction": "None",
//               "token": "09d1c1e6-f627-419b-857b-bdd610aafab7",
//               "name": "Original Tee with Stamp Design (Green) XL",
//               "price": 35,
//               "quantity": 1,
//               "fileGuid": null,
//               "url": "https://loyaltofew-staging.vercel.app/store/mens/tee/stamp/green",
//               "id": "mensteestampgreen:xl",
//               "initialData": "",
//               "description": "Original Tee with Stamp Design (Green) XL",
//               "categories": [ ],
//               "totalPriceWithoutTaxes": 35,
//               "weight": 7,
//               "image": "/images/products/mens/tee/MensTeeStampGreen.jpg",
//               "originalPrice": null,
//               "uniqueId": "03d9c879-306c-4b3c-9494-06d635ae18fd",
//               "stackable": true,
//               "minQuantity": null,
//               "maxQuantity": null,
//               "addedOn": "2023-03-29T22:23:13Z",
//               "modificationDate": "2023-03-29T22:23:13Z",
//               "shippable": true,
//               "taxable": true,
//               "duplicatable": false,
//               "width": null,
//               "height": null,
//               "length": null,
//               "metadata": null,
//               "totalPrice": 35,
//               "totalWeight": 7,
//               "taxes": [ ],
//               "alternatePrices": { },
//               "customFields": [ ],
//               "unitPrice": 35,
//               "hasDimensions": false,
//               "parcels": null,
//               "hasTaxesIncluded": false,
//               "totalPriceWithoutDiscountsAndTaxes": 35
//           },
//           {
//               "paymentSchedule": {
//                   "interval": 0,
//                   "intervalCount": 1,
//                   "trialPeriodInDays": null,
//                   "startsOn": "2023-04-03T00:00:00Z"
//               },
//               "pausingAction": "None",
//               "cancellationAction": "None",
//               "token": "09d1c1e6-f627-419b-857b-bdd610aafab7",
//               "name": "Trucker Snapback with Block Design (Black-White) Adjustable",
//               "price": 30,
//               "quantity": 1,
//               "fileGuid": null,
//               "url": "https://loyaltofew-staging.vercel.app/store/outerwear/snapback/block/black-white",
//               "id": "outerwearsnapbackblockblack-white:adjustable",
//               "initialData": "",
//               "description": "Trucker Snapback with Block Design (Black-White) Adjustable",
//               "categories": [ ],
//               "totalPriceWithoutTaxes": 30,
//               "weight": 14.4,
//               "image": "/images/products/outerwear/snapback/OuterwearSnapbackBlockBlack-White.jpg",
//               "originalPrice": null,
//               "uniqueId": "906fc78b-9bbd-45b6-a2e4-13a4d4cd843c",
//               "stackable": true,
//               "minQuantity": null,
//               "maxQuantity": null,
//               "addedOn": "2023-03-29T22:23:24Z",
//               "modificationDate": "2023-03-29T22:23:24Z",
//               "shippable": true,
//               "taxable": true,
//               "duplicatable": false,
//               "width": null,
//               "height": null,
//               "length": null,
//               "metadata": null,
//               "totalPrice": 30,
//               "totalWeight": 14.4,
//               "taxes": [ ],
//               "alternatePrices": { },
//               "customFields": [ ],
//               "unitPrice": 30,
//               "hasDimensions": false,
//               "parcels": null,
//               "hasTaxesIncluded": false,
//               "totalPriceWithoutDiscountsAndTaxes": 30
//           },
//           {
//               "paymentSchedule": {
//                   "interval": 0,
//                   "intervalCount": 1,
//                   "trialPeriodInDays": null,
//                   "startsOn": "2023-04-03T00:00:00Z"
//               },
//               "pausingAction": "None",
//               "cancellationAction": "None",
//               "token": "09d1c1e6-f627-419b-857b-bdd610aafab7",
//               "name": "Original Oversized Crop with Stenciled Design (Dolphin) One Size Fits Most",
//               "price": 30,
//               "quantity": 1,
//               "fileGuid": null,
//               "url": "https://loyaltofew-staging.vercel.app/store/womens/oversized-crop/stenciled/dolphin",
//               "id": "womensoversized-cropstencileddolphin:one-size-fits-most",
//               "initialData": "",
//               "description": "Original Oversized Crop with Stenciled Design (Dolphin) One Size Fits Most",
//               "categories": [ ],
//               "totalPriceWithoutTaxes": 30,
//               "weight": 2.9,
//               "image": "/images/products/womens/oversized-crop/WomensOversized-CropStenciledDolphin.jpg",
//               "originalPrice": null,
//               "uniqueId": "b4789b45-a78d-43fb-9830-ed9b44a60dbb",
//               "stackable": true,
//               "minQuantity": null,
//               "maxQuantity": null,
//               "addedOn": "2023-03-29T22:23:39Z",
//               "modificationDate": "2023-03-29T22:23:39Z",
//               "shippable": true,
//               "taxable": true,
//               "duplicatable": false,
//               "width": null,
//               "height": null,
//               "length": null,
//               "metadata": null,
//               "totalPrice": 30,
//               "totalWeight": 2.9,
//               "taxes": [ ],
//               "alternatePrices": { },
//               "customFields": [ ],
//               "unitPrice": 30,
//               "hasDimensions": false,
//               "parcels": null,
//               "hasTaxesIncluded": false,
//               "totalPriceWithoutDiscountsAndTaxes": 30
//           }
//       ],
//       "plans": [ ],
//       "refunds": [
//           {
//               "orderToken": "09d1c1e6-f627-419b-857b-bdd610aafab7",
//               "amount": 30,
//               "comment": "head too bigg",
//               "notifyCustomer": true,
//               "refundedByPaymentGateway": true,
//               "id": "b41c0ce1-c036-4274-b4ff-c60171cbe4ee",
//               "creationDate": "2023-04-02T23:40:22.58Z",
//               "modificationDate": "2023-04-02T23:40:22.58Z"
//           }
//       ],
//       "taxes": [
//           {
//               "taxName": "Loyal To Few",
//               "taxRate": 0.0725,
//               "amount": 7.43,
//               "numberForInvoice": "",
//               "includedInPrice": false,
//               "appliesOnShipping": true,
//               "discountInducedAmountVariation": 0
//           }
//       ],
//       "user": {
//           "id": "b34fbdb2-f716-4618-b198-18820acac954",
//           "email": "mike@mikegulline.com",
//           "mode": "Test",
//           "statistics": {
//               "ordersCount": 0,
//               "ordersAmount": null,
//               "subscriptionsCount": 0
//           },
//           "creationDate": "2023-02-09T01:00:48Z",
//           "billingAddressFirstName": null,
//           "billingAddressName": "Mike Gulline",
//           "billingAddressCompanyName": null,
//           "billingAddressAddress1": "7624 Potter Valley Drive",
//           "billingAddressAddress2": "",
//           "billingAddressCity": "Corona",
//           "billingAddressCountry": "US",
//           "billingAddressProvince": "CA",
//           "billingAddressPostalCode": "92880",
//           "billingAddressPhone": "",
//           "shippingAddressFirstName": null,
//           "shippingAddressName": "Mike Gulline",
//           "shippingAddressCompanyName": null,
//           "shippingAddressAddress1": "7624 Potter Valley Drive",
//           "shippingAddressAddress2": "",
//           "shippingAddressCity": "Corona",
//           "shippingAddressCountry": "US",
//           "shippingAddressProvince": "CA",
//           "shippingAddressPostalCode": "92880",
//           "shippingAddressPhone": "",
//           "shippingAddressSameAsBilling": false,
//           "status": "Unconfirmed",
//           "sessionToken": null,
//           "gravatarUrl": "https://www.gravatar.com/avatar/9248356a37f4f5912915ff0d0ecab455?s=70&d=https%3a%2f%2fcdn.snipcart.com%2fassets%2fimages%2favatar.jpg",
//           "billingAddress": {
//               "fullName": "Mike Gulline",
//               "firstName": null,
//               "name": "Mike Gulline",
//               "company": null,
//               "address1": "7624 Potter Valley Drive",
//               "address2": "",
//               "fullAddress": "7624 Potter Valley Drive",
//               "city": "Corona",
//               "country": "US",
//               "postalCode": "92880",
//               "province": "CA",
//               "phone": "",
//               "vatNumber": null,
//               "hasMinimalRequiredInfo": true,
//               "validationErrors": { }
//           },
//           "shippingAddress": {
//               "fullName": "Mike Gulline",
//               "firstName": null,
//               "name": "Mike Gulline",
//               "company": null,
//               "address1": "7624 Potter Valley Drive",
//               "address2": "",
//               "fullAddress": "7624 Potter Valley Drive",
//               "city": "Corona",
//               "country": "US",
//               "postalCode": "92880",
//               "province": "CA",
//               "phone": "",
//               "vatNumber": null,
//               "hasMinimalRequiredInfo": true,
//               "validationErrors": { }
//           }
//       },
//       "token": "09d1c1e6-f627-419b-857b-bdd610aafab7",
//       "isRecurringOrder": false,
//       "isRecurringV3Order": false,
//       "parentToken": null,
//       "parentInvoiceNumber": null,
//       "subscriptionId": null,
//       "currency": "usd",
//       "creationDate": "2023-03-29T22:23:12Z",
//       "modificationDate": "2023-04-03T16:20:35.063Z",
//       "recoveredFromCampaignId": null,
//       "status": "Shipped",
//       "paymentStatus": "Paid",
//       "email": "mike@mikegulline.com",
//       "willBePaidLater": false,
//       "billingAddress": {
//           "fullName": "Mike Gulline",
//           "firstName": null,
//           "name": "Mike Gulline",
//           "company": null,
//           "address1": "7624 Potter Valley Drive",
//           "address2": "",
//           "fullAddress": "7624 Potter Valley Drive",
//           "city": "Corona",
//           "country": "US",
//           "postalCode": "92880",
//           "province": "CA",
//           "phone": "",
//           "vatNumber": null,
//           "hasMinimalRequiredInfo": true,
//           "validationErrors": { }
//       },
//       "shippingAddress": {
//           "fullName": "Mike Gulline",
//           "firstName": null,
//           "name": "Mike Gulline",
//           "company": null,
//           "address1": "7624 Potter Valley Drive",
//           "address2": "",
//           "fullAddress": "7624 Potter Valley Drive",
//           "city": "Corona",
//           "country": "US",
//           "postalCode": "92880",
//           "province": "CA",
//           "phone": "",
//           "vatNumber": null,
//           "hasMinimalRequiredInfo": true,
//           "validationErrors": { }
//       },
//       "shippingAddressSameAsBilling": true,
//       "creditCardLast4Digits": "4242",
//       "trackingNumber": "9461200104262193603607",
//       "trackingUrl": "https://track.easypost.com/djE6dHJrXzE0NmYzZGM5ZWU5NzQ0OWY5NjViYzY5MmRlYjFiOGVk",
//       "shippingFees": 7.5,
//       "shippingProvider": null,
//       "shippingMethod": "$7.50 shipping (ParcelSelect USPS) est. 3 days",
//       "shippingLocalizedMethod": "$7.50 shipping (ParcelSelect USPS) est. 3 days",
//       "cardHolderName": null,
//       "paymentMethod": "CreditCard",
//       "notes": null,
//       "mode": "Test",
//       "customFieldsJson": "[]",
//       "userId": "b34fbdb2-f716-4618-b198-18820acac954",
//       "completionDate": "2023-03-29T22:26:00Z",
//       "cardType": "Visa",
//       "paymentGatewayUsed": "SnipcartPaymentService",
//       "paymentDetails": {
//           "iconUrl": null,
//           "display": null,
//           "instructions": null
//       },
//       "taxProvider": "Default",
//       "lang": "en",
//       "refundsAmount": 30,
//       "adjustedAmount": 79.93,
//       "finalGrandTotal": 109.93,
//       "billingAddressFirstName": null,
//       "billingAddressName": "Mike Gulline",
//       "billingAddressCompanyName": null,
//       "billingAddressAddress1": "7624 Potter Valley Drive",
//       "billingAddressAddress2": "",
//       "billingAddressCity": "Corona",
//       "billingAddressCountry": "US",
//       "billingAddressProvince": "CA",
//       "billingAddressPostalCode": "92880",
//       "billingAddressPhone": "",
//       "shippingAddressFirstName": null,
//       "shippingAddressName": "Mike Gulline",
//       "shippingAddressCompanyName": null,
//       "shippingAddressAddress1": "7624 Potter Valley Drive",
//       "shippingAddressAddress2": "",
//       "shippingAddressCity": "Corona",
//       "shippingAddressCountry": "US",
//       "shippingAddressProvince": "CA",
//       "shippingAddressPostalCode": "92880",
//       "shippingAddressPhone": "",
//       "totalNumberOfItems": 0,
//       "invoiceNumber": "LTF1053",
//       "billingAddressComplete": true,
//       "shippingAddressComplete": true,
//       "shippingMethodComplete": true,
//       "savedAmount": 0,
//       "subtotal": 95,
//       "baseTotal": 109.93,
//       "itemsTotal": 95,
//       "totalPriceWithoutDiscountsAndTaxes": 95,
//       "taxableTotal": 95,
//       "grandTotal": 109.93,
//       "total": 109.93,
//       "totalWeight": 24.3,
//       "totalRebateRate": 0,
//       "customFields": [ ],
//       "shippingEnabled": true,
//       "numberOfItemsInOrder": 3,
//       "paymentTransactionId": "ch_3Mr7PZGiJhTY9z5G0ne1b6PV",
//       "metadata": {
//           "shipment_id": "shp_c8149c5c038544a1b4ccd26f7628fa32",
//           "trackerId": "trk_146f3dc9ee97449f965bc692deb1b8ed",
//           "rate_id": "pl_e63010fcdfc044bba6b3183bdcdedb4a",
//           "label_url": "https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/20230329/265dc84f1ced425b81f6c8645d1e761c.png",
//           "label_size": "4x6",
//           "status": "Shipped",
//           "packed": [
//               1,
//               1,
//               1
//           ]
//       },
//       "taxesTotal": 7.43,
//       "itemsCount": 3,
//       "summary": {
//           "subtotal": 95,
//           "taxableTotal": 95,
//           "total": 109.93,
//           "payableNow": 109.93,
//           "paymentMethod": "CreditCard",
//           "taxes": [
//               {
//                   "taxId": null,
//                   "name": "Loyal To Few",
//                   "rate": 0.0725,
//                   "amount": 7.43,
//                   "unroundedAmount": 7.43,
//                   "numberForInvoice": "",
//                   "includedInPrice": false,
//                   "appliesOnShipping": true,
//                   "discountInducedAmountVariation": 0
//               }
//           ],
//           "discountInducedTaxesVariation": 0,
//           "adjustedTotal": 79.93,
//           "shipping": null
//       },
//       "ipAddress": "99.8.112.175",
//       "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/111.0",
//       "hasSubscriptions": false
//   }
