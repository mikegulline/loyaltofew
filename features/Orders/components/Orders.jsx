import { useState } from 'react';
import Container from '../../../components/Container';
import { ProcessOrder } from '../../ProcessOrder';
import LoadMore from './LoadMore';
import OrdersList from './OrdersList';
import Header from './Header';

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
      <ProcessOrder
        orders={orders}
        current={current}
        nextClose={updateOrdersNextClose}
      />
    ) : null;

  const headerProps = {
    orders,
    total,
  };

  const ordersListProps = {
    orders,
    setCurrent,
  };

  const loadMoreProps = {
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
