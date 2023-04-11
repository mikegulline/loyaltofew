import { useState, useCallback } from 'react';
import handleProcessOrder from '../api/handleProcessOrder';
import OrderItems from './OrderItems';
import UIReturns from './UIReturns';
import Wrapper from './Wrapper';
import Header from './Header';

export default function ProcessOrder({ order, message, nextClose }) {
  const [currentOrder, setCurrentOrder] = useState(order);
  const { token, items, metadata } = currentOrder;

  const updateOrder = useCallback(
    async (update) => {
      setCurrentOrder({ ...currentOrder, ...update });
      const { data } = await handleProcessOrder(token, update);
      return data;
    },
    [token, currentOrder]
  );

  const handleNextClose = useCallback((next) => nextClose(), [nextClose]);

  const headerProps = {
    currentOrder,
    handleNextClose,
  };

  const orderItemsProps = {
    items,
    metadata,
    updateOrder,
  };

  const uiReturns = {
    metadata,
    currentOrder,
    updateOrder,
  };

  return (
    <Wrapper token={token}>
      <Header {...headerProps} />
      <div className=' mb-8 max-h-32 overflow-y-auto'>{message}</div>
      <OrderItems {...orderItemsProps} />
      <UIReturns {...uiReturns} />
    </Wrapper>
  );
}
