import axios from 'axios';
import { useState } from 'react';
import { getSession } from 'next-auth/react';
import Container from '../../../components/Container';
import { H1 } from '../../../components/Type';
import OrderProcessOverlay from '../../../components/OrderProcessOverlay';

export default function Orders({ passOrders, limit, totalItems }) {
  const [orders, setOrders] = useState(passOrders);
  const [current, setCurrent] = useState(null);
  const [total, setTotal] = useState(totalItems);

  // update orders state
  // set current order
  const updateOrdersNextClose = (orderToUpdate, next) => {
    let updateOrders = orders.map((order, i) =>
      current === i ? orderToUpdate : order
    );

    let isNext = next;

    if (orderToUpdate.status === 'Shipped') {
      updateOrders = updateOrders.filter((order) => order.status !== 'Shipped');
      isNext = next > 0 ? 0 : next;
      setTotal(total - 1);
    }

    setOrders(updateOrders);
    setCurrent(next ? current + isNext : null);
  };

  const Overlay = () =>
    current != null ? (
      <OrderProcessOverlay
        order={orders[current]}
        current={current}
        nextClose={updateOrdersNextClose}
      />
    ) : null;

  const OrderItems = () => (
    <ul className='my-6 flex flex-col gap-1 border-y-4 border-red-600 border-b-gray-500 py-6'>
      {orders?.map((order, i) => {
        const { token, finalGrandTotal, items, invoiceNumber } = order;
        const totalItems = items.reduce(
          (acc, curr) => Number(acc + curr.quantity),
          [0]
        );
        return (
          <li
            key={token}
            onClick={() => {
              setCurrent(i);
            }}
            className={`flex cursor-pointer items-center rounded border p-4 hover:border-green-600 hover:bg-green-100`}
          >
            <div className='w-28'>{invoiceNumber}</div>
            <div>Items: {totalItems}</div>
            <div className='flex grow justify-end'>${finalGrandTotal}</div>
          </li>
        );
      })}
    </ul>
  );

  const LoadMore = () => {
    const handleLoadMore = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/orders`,
          {
            params: {
              status: 'pending',
              limit: limit,
              offset: orders.length,
            },
          }
        );
        console.log(data);
        setTotal(data.totalItems);
        setOrders([...orders, ...data.items]);
      } catch (errors) {
        console.log(errors);
      }
    };

    const disabled = total === orders.length;
    const countToLoad = total - orders.length;
    const loadMore = countToLoad > limit ? limit : countToLoad;

    return (
      <div className='flex justify-center '>
        <button
          disabled={disabled}
          onClick={() => handleLoadMore()}
          className='flex items-center gap-2 hover:bg-black  hover:text-white disabled:bg-white disabled:text-black disabled:opacity-25'
        >
          Load More {loadMore > 0 && loadMore}
        </button>
      </div>
    );
  };

  return (
    <>
      <Overlay />
      <Container size='xs' className='py-10'>
        <H1 className='flex items-center'>
          <span className='grow'>Orders</span>{' '}
          <span className='text-gray-200'>
            {orders.length} of {total}
          </span>
        </H1>
        <OrderItems />
        <LoadMore />
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
          limit: 5,
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
  const passPaging = {
    totalItems,
    limit,
  };
  return {
    props: {
      passPaging,
      totalItems,
      limit,
      passOrders: items,
    },
  };
}
