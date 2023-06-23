import { useState, useEffect, useCallback } from 'react';
import Container from '@/components/Container';
import { ProcessOrder } from '../../ProcessOrder';
import LoadMore from './LoadMore';
import OrdersList from './OrdersList';
import Header from './Header';
import apiOrders from '@/utils/api-orders';
import PrintPackingSlips from './PrintPackingSlips';
import handleProcessOrder from '@/utils/handleProcessOrder';

export default function Orders({ passOrders, limit, totalItems }) {
  const [orderType, setOrderType] = useState('Processed');
  const [orders, setOrders] = useState(passOrders);
  const [current, setCurrent] = useState(null);
  const [total, setTotal] = useState(totalItems);

  useEffect(() => {
    (async () => {
      const data = await apiOrders(orderType, limit, 0);
      setTotal(data.totalItems);
      setOrders(data.items);
    })();
  }, [orderType, limit]);

  const printPackingSlipsCallback = useCallback(async () => {
    const newOrders = [];
    for (const order of orders) {
      if (!order.metadata?.print_packing_slip) {
        const { data } = await handleProcessOrder(order.token, {
          ...order,
          metadata: { ...order.metadata, print_packing_slip: true },
        });
        newOrders.push({ ...data });
      } else {
        newOrders.push({ ...order });
      }
    }
    setOrders(newOrders);
    return;
  }, [orders]);

  // const waitHere = (time) => {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, time);
  //   });
  // };

  // update orders state
  // set current order
  const updateOrdersNextClose = useCallback(
    (orderToUpdate, next) => {
      let updateOrders = orders.map((order, i) =>
        orderToUpdate.token === order.token ? orderToUpdate : order
      );

      let isNext = next;

      if (orderToUpdate.status === 'Pending' && orderType === 'Processed') {
        updateOrders = updateOrders.filter(
          (order) => order.status !== 'Pending'
        );
        isNext = next > 0 ? 0 : next;
        setTotal(total - 1);
      }
      setOrders(updateOrders);
      setCurrent(next ? current + isNext : null);
    },
    [current, orders, total, orderType]
  );

  const Overlay = useCallback(
    () =>
      current != null ? (
        <ProcessOrder
          orderType={orderType}
          orders={orders}
          current={current}
          nextClose={updateOrdersNextClose}
        />
      ) : null,
    [orders, current, updateOrdersNextClose, orderType]
  );

  const headerProps = {
    orders,
    total,
    setOrderType,
  };

  const ordersListProps = {
    orders,
    setCurrent,
  };

  const loadMoreProps = {
    orderType,
    orders,
    setOrders,
    total,
    setTotal,
    limit,
  };
  return (
    <Container size='xs' className='pb-20'>
      <Overlay />
      <Header {...headerProps} />
      <OrdersList {...ordersListProps} />
      <div className='flex justify-center '>
        <LoadMore {...loadMoreProps} />
        {orderType === 'Processed' && (
          <PrintPackingSlips
            orders={orders}
            callback={printPackingSlipsCallback}
            className='ml-3 disabled:opacity-25'
          >
            Print Packing Slips
          </PrintPackingSlips>
        )}
      </div>
    </Container>
  );
}
