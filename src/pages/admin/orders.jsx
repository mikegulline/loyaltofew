import { getSession } from 'next-auth/react';
import { Orders } from '@/features/Orders';
import apiOrders from '@/utils/api-orders';

export default function OrdersPage(props) {
  // const ordersProps = { passOrders, limit, totalItems };
  return <Orders {...props} />;
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
  const data = await apiOrders('pending', 2, 0);
  const { totalItems, limit, items: passOrders } = data;
  return {
    props: {
      totalItems,
      limit,
      passOrders,
    },
  };
}
