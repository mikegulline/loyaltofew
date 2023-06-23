import { useState, useCallback } from 'react';
import handleProcessOrder from '@/utils/handleProcessOrder';
import OrderItems from './OrderItems';
import UIShipping from './UIShipping';
import Wrapper from './Wrapper';
import Header from './Header';

export default function ProcessOrder({
  orderType,
  orders,
  current,
  nextClose,
}) {
  const order = orders[current];
  const total = orders.length;

  const [currentOrder, setCurrentOrder] = useState(order);
  const {
    token,
    items,
    metadata,
    metadata: { label_url },
  } = currentOrder;

  const updateOrder = useCallback(
    async (update, ship = null) => {
      setCurrentOrder({ ...currentOrder, ...update });
      const { data } = await handleProcessOrder(token, update, ship);
      return data;
    },
    [token, currentOrder]
  );

  const handleNextClose = useCallback(
    (next) => nextClose(currentOrder, next),
    [currentOrder, nextClose]
  );

  const headerProps = {
    currentOrder,
    handleNextClose,
    orderType,
  };

  const orderItemsProps = {
    items,
    metadata,
    updateOrder,
  };

  const uiShippingProps = {
    current,
    orderType,
    total,
    metadata,
    updateOrder,
    label_url,
    handleNextClose,
  };

  return (
    <Wrapper token={token}>
      <Header {...headerProps} />
      <OrderItems {...orderItemsProps} />
      <UIShipping {...uiShippingProps} />
    </Wrapper>
  );
}
