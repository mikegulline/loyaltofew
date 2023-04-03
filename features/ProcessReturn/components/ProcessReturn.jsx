import { useState, useCallback } from 'react';
import handleProcessOrder from '../api/handleProcessOrder';
import OrderItems from './OrderItems';
import UIShipping from './UIShipping';
import Wrapper from './Wrapper';
import Header from './Header';

export default function ProcessOrder({ order, nextClose }) {
  const [currentOrder, setCurrentOrder] = useState(order);
  const { token, items, metadata } = currentOrder;

  if (!metadata?.returns) {
    let a = new Array(items.length);
    for (let i = 0; i < items.length; i++) a[i] = 0;
    metadata.returns.packed = a;
  }

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

  // const uiShippingProps = {
  //   current,
  //   total,
  //   metadata,
  //   updateOrder,
  //   label_url,
  //   handleNextClose,
  // };

  return (
    <Wrapper token={token}>
      <Header {...headerProps} />
      <OrderItems {...orderItemsProps} />
      {/* <UIShipping {...uiShippingProps} /> */}
    </Wrapper>
  );
}
