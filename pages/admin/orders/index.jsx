import axios from 'axios';
import { getSession } from 'next-auth/react';
import Container from '../../../components/Container';
import Link from 'next/link';
import { H1 } from '../../../components/Type';

export default function Orders({ orders }) {
  return (
    <Container size='xs' className='py-10'>
      <H1>Orders</H1>
      <ul>
        {orders?.map((order) => {
          const { token, finalGrandTotal, metadata, items, invoiceNumber } =
            order;
          if (!metadata) return;
          const { label_url } = metadata;
          console.log(order);
          return (
            <li key={token}>
              {invoiceNumber} {finalGrandTotal}{' '}
              {label_url && <Link href={label_url}>Label</Link>}
              {/* <ul>
                {items.map((item) => {
                  const { description, id, quantity } = item;
                  return (
                    <li key={id}>
                      -- x{quantity}: {description}
                    </li>
                  );
                })}
              </ul> */}
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  let orders;
  try {
    const secret = process.env.SNIPCART_SECRET + ':';
    orders = await axios.get(
      `https://app.snipcart.com/api/orders?offset=0&limit=5&status=pending`, //processed
      {
        headers: {
          Authorization: `Basic ${btoa(secret)}`,
          Accept: 'application/json',
        },
      }
    );
  } catch (errors) {
    console.log({ message: 'tracking to snipcart', errors });
  }
  const { totalItems, limit, offset, items } = orders.data;
  const paging = {
    totalItems,
    limit,
    offset,
  };
  return {
    props: {
      paging,
      orders: items.reverse(),
    },
  };
}

// const data = {
//   discounts: [],
//   items: [Array],
//   plans: [],
//   refunds: [],
//   taxes: [],
//   user: [Object],
//   token: 'b2a32ef3-5f72-44c1-aa71-9e43785de6c7',
//   isRecurringOrder: false,
//   isRecurringV3Order: false,
//   parentToken: null,
//   parentInvoiceNumber: null,
//   subscriptionId: null,
//   currency: 'usd',
//   creationDate: '2023-02-15T00:25:15Z',
//   modificationDate: '2023-02-15T00:26:09Z',
//   recoveredFromCampaignId: null,
//   status: 'Processed',
//   paymentStatus: 'Paid',
//   email: 'mike@mikegulline.com',
//   willBePaidLater: false,
//   billingAddress: [Object],
//   shippingAddress: [Object],
//   shippingAddressSameAsBilling: true,
//   creditCardLast4Digits: '4242',
//   trackingNumber: null,
//   trackingUrl: null,
//   shippingFees: 7.58,
//   shippingProvider: null,
//   shippingMethod: '$7.58 shipping (Priority USPS) est. 2 days',
//   shippingLocalizedMethod: '$7.58 shipping (Priority USPS) est. 2 days',
//   cardHolderName: 'Mike Gulline',
//   paymentMethod: 'CreditCard',
//   notes: null,
//   mode: 'Test',
//   customFieldsJson: '[]',
//   userId: 'b34fbdb2-f716-4618-b198-18820acac954',
//   completionDate: '2023-02-15T00:26:09Z',
//   cardType: 'Visa',
//   paymentGatewayUsed: 'SnipcartPaymentService',
//   paymentDetails: [Object],
//   taxProvider: 'Default',
//   lang: 'en',
//   refundsAmount: 0,
//   adjustedAmount: 37.58,
//   finalGrandTotal: 37.58,
//   billingAddressFirstName: null,
//   billingAddressName: 'Mike Gulline',
//   billingAddressCompanyName: null,
//   billingAddressAddress1: '7624 Potter Valley Drive',
//   billingAddressAddress2: '',
//   billingAddressCity: 'Corona',
//   billingAddressCountry: 'US',
//   billingAddressProvince: 'CA',
//   billingAddressPostalCode: '92880',
//   billingAddressPhone: '',
//   shippingAddressFirstName: null,
//   shippingAddressName: 'Mike Gulline',
//   shippingAddressCompanyName: null,
//   shippingAddressAddress1: '7624 Potter Valley Drive',
//   shippingAddressAddress2: '',
//   shippingAddressCity: 'Corona',
//   shippingAddressCountry: 'US',
//   shippingAddressProvince: 'CA',
//   shippingAddressPostalCode: '92880',
//   shippingAddressPhone: '',
//   totalNumberOfItems: 0,
//   invoiceNumber: 'LTF1016',
//   billingAddressComplete: true,
//   shippingAddressComplete: true,
//   shippingMethodComplete: true,
//   savedAmount: 0,
//   subtotal: 30,
//   baseTotal: 37.58,
//   itemsTotal: 30,
//   totalPriceWithoutDiscountsAndTaxes: 30,
//   taxableTotal: 30,
//   grandTotal: 37.58,
//   total: 37.58,
//   totalWeight: 7,
//   totalRebateRate: 0,
//   customFields: [],
//   shippingEnabled: true,
//   numberOfItemsInOrder: 1,
//   paymentTransactionId: '31be423d-3a09-4d83-8646-30829557f5a3',
//   metadata: null,
//   taxesTotal: 0,
//   itemsCount: 1,
//   summary: [Object],
//   ipAddress: '99.8.112.175',
//   userAgent:
//     'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0',
//   hasSubscriptions: false,
// };
