import axios from 'axios';
import { useState } from 'react';
import { getSession } from 'next-auth/react';
import Container from '../../../components/Container';
import { H1 } from '../../../components/Type';
import OrderProcessOverlay from './components/OrderProcessOverlay';

export default function Orders({ passOrders, paging }) {
  const [orders, setOrders] = useState(passOrders);
  const [current, setCurrent] = useState(null);
  console.log(paging);

  const Pagination = () => {};

  // update orders state
  // set current order
  const updateOrdersNextClose = (orderToUpdate, close) => {
    setOrders(
      orders.map((order, i) => (current === i ? orderToUpdate : order))
    );
    setCurrent(close ? null : current + 1);
  };

  const Overlay = () =>
    current != null ? (
      <OrderProcessOverlay
        order={orders[current]}
        total={orders.length}
        current={current}
        nextClose={updateOrdersNextClose}
      />
    ) : null;

  const OrderItems = () =>
    orders?.map((order, i) => {
      const { token, finalGrandTotal, metadata, items, invoiceNumber } = order;
      if (!metadata.packed) return <li key={token}></li>;
      return (
        <li
          key={token}
          onClick={() => {
            setCurrent(i);
          }}
        >
          {invoiceNumber} | {items.length} | ${finalGrandTotal}
        </li>
      );
    });

  return (
    <>
      <Overlay />
      <Container size='xs' className='py-10'>
        <H1>Orders</H1>
        <ul>
          <OrderItems />
        </ul>
      </Container>
    </>
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
    orders = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/orders`,
      {
        params: {
          status: 'pending',
          limit: 2,
          offset: 0,
        },
      }
    );
  } catch (errors) {
    console.log({
      message: 'getting orders',
      errors,
    });
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
      passOrders: items,
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
