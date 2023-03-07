import { useState, useCallback } from 'react';
import Image from 'next/image';
import { H1 } from './Type';
import processOrder from '../utils/processOrder';
import Buttons from './Buttons';

export default function OrderProcessOverlay({
  order,
  total,
  current,
  nextClose,
}) {
  const [currentOrder, setCurrentOrder] = useState(order);
  const {
    token,
    invoiceNumber,
    status,
    items,
    metadata,
    metadata: { label_url },
  } = currentOrder;

  // immediately update order state
  // async update API data
  const updateOrder = async (update) => {
    setCurrentOrder({ ...currentOrder, ...update });
    const { data } = await processOrder(token, update);
    return data;
  };

  // update orders state
  // handle next or close
  // refresh on currentOrder change
  const handleNextClose = useCallback(
    (close) => nextClose(currentOrder, close),
    [currentOrder, nextClose]
  );

  const Wrapper = ({ children }) => (
    <div className=' fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-white'>
      <Buttons.Close handleClose={handleNextClose} />
      <div className='w-full max-w-screen-lg' key={token}>
        {status}

        {children}
      </div>
    </div>
  );

  const Header = () => (
    <H1 className='flex'>
      <span className='flex-1'>{invoiceNumber}</span>
      <span style={{ color: '#e4e4e6' }}>
        {current + 1}/{total}
      </span>
    </H1>
  );

  const UI = () => (
    <div className='flex justify-end gap-3 pt-20'>
      <Buttons.Packed token={token} />
      <Buttons.Print token={token} image={label_url} />
      <Buttons.Shipped handleUpdate={updateOrder} />
      <Buttons.Next
        disable={total - 1 === current}
        handleNext={handleNextClose}
      />
    </div>
  );

  return (
    <Wrapper>
      <Header />
      <OrderItems
        items={items}
        metadata={metadata}
        handleUpdate={updateOrder}
      />
      <UI />
    </Wrapper>
  );
}

const OrderItems = ({ items, metadata, handleUpdate }) => {
  return (
    <ul className='flex justify-center gap-4'>
      {items.map((item, i) => {
        const updateItemsPacked = () => {
          const updatePacked = [...metadata.packed];
          updatePacked[i] = updatePacked[i] ? 0 : 1;
          handleUpdate({
            metadata: {
              ...metadata,
              packed: updatePacked,
            },
          });
        };

        return (
          <OrderItem
            key={item.id}
            item={item}
            isPacked={metadata.packed[i]}
            handleUpdateItemsPacked={updateItemsPacked}
          />
        );
      })}
    </ul>
  );
};

const OrderItem = ({ item, isPacked, handleUpdateItemsPacked }) => {
  const { image, quantity, description } = item;

  const Wrapper = ({ children }) => (
    <li
      className='border-#e4e4e6 flex h-96 w-1/4 cursor-pointer flex-col items-center gap-2 rounded-md border p-4'
      onClick={() => handleUpdateItemsPacked()}
    >
      {children}
    </li>
  );

  const Thumbnail = () => (
    <Image
      src={image}
      width={210}
      height={210}
      alt={''}
      style={{
        background: '#e4e4e6',
        border: '10px solid #e4e4e6',
        borderRadius: '4px',
      }}
    />
  );

  const Infos = () => (
    <ul className='flex flex-1 flex-col'>
      <li>{description}</li>
      <li className='flex flex-1 flex-col justify-end'>
        <div className='flex'>
          <div className='grow'>
            <strong>Quantity:</strong> {quantity}
          </div>
          <div>
            <strong>Packed:</strong> {isPacked}
          </div>
        </div>
      </li>
    </ul>
  );

  return (
    <Wrapper>
      <Thumbnail />
      <Infos />
    </Wrapper>
  );
};
