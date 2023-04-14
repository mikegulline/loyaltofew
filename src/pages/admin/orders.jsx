import axios from 'axios';
import { getSession } from 'next-auth/react';
import { Orders } from '@/features/Orders';

export default function OrdersPage({ passOrders, limit, totalItems }) {
  const ordersProps = { passOrders, limit, totalItems };
  return <Orders {...ordersProps} />;
}

////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////

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
          limit: 10,
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
  const { totalItems, limit, items } = orders.data;
  return {
    props: {
      totalItems,
      limit,
      passOrders: items,
    },
  };
}
