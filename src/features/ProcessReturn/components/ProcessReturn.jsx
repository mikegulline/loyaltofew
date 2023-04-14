import { useState, useCallback } from 'react';
import handleProcessOrder from '@/utils/handleProcessOrder';
import OrderItems from './OrderItems';
import UIReturns from './UIReturns';
import Wrapper from './Wrapper';
import Header from './Header';

export default function ProcessOrder({ order, message, handleClose }) {
  const [fetching, setFetching] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(order);
  const [status, setStatus] = useState(null);
  const { token, items, metadata } = currentOrder;

  const updateOrder = useCallback(
    async (update) => {
      setCurrentOrder({ ...currentOrder, ...update });
      const { data } = await handleProcessOrder(token, update);
      return data;
    },
    [token, currentOrder]
  );

  const handleCloseWithStatus = useCallback(
    () => handleClose(status),
    [handleClose, status]
  );

  const headerProps = {
    fetching,
    currentOrder,
    handleClose: handleCloseWithStatus,
  };

  const orderItemsProps = {
    fetching,
    items,
    metadata,
    updateOrder,
  };

  const uiReturns = {
    currentOrder,
    metadata,
    updateOrder,
    setStatus,
    fetching,
    setFetching,
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
