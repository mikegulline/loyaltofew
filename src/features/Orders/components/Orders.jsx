import { useState, useEffect, useCallback } from 'react';
import Container from '@/components/Container';
import { ProcessOrder } from '../../ProcessOrder';
import LoadMore from './LoadMore';
import OrdersList from './OrdersList';
import Header from './Header';
import apiOrders from '@/utils/api-orders';

export default function Orders({ passOrders, limit, totalItems }) {
  const [orderType, setOrderType] = useState('pending');
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

  // update orders state
  // set current order
  const updateOrdersNextClose = useCallback(
    (orderToUpdate, next) => {
      let updateOrders = orders.map((order, i) =>
        current === i ? orderToUpdate : order
      );

      let isNext = next;

      if (orderToUpdate.status === 'Shipped') {
        updateOrders = updateOrders.filter(
          (order) => order.status !== 'Shipped'
        );
        isNext = next > 0 ? 0 : next;
        setTotal(total - 1);
      }

      setOrders(updateOrders);
      setCurrent(next ? current + isNext : null);
    },
    [current, orders, total]
  );

  const Overlay = useCallback(
    () =>
      current != null ? (
        <ProcessOrder
          orders={orders}
          current={current}
          nextClose={updateOrdersNextClose}
        />
      ) : null,
    [orders, current, updateOrdersNextClose]
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
      <LoadMore {...loadMoreProps} />
    </Container>
  );
}
