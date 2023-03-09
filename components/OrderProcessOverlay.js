import { useState, useCallback } from 'react';
import Image from 'next/image';
import { H1 } from './Type';
import processOrder from '../utils/processOrder';
import Buttons from './OrderProcessButtons';

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
    items,
    metadata,
    metadata: { label_url, status },
  } = currentOrder;

  const updateOrder = async (update) => {
    setCurrentOrder({ ...currentOrder, ...update });
    const { data } = await processOrder(token, update);
    return data;
  };

  const handleNextClose = useCallback(
    (next) => nextClose(currentOrder, next),
    [currentOrder, nextClose]
  );

  const Wrapper = ({ children }) => (
    <div className=' fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-gray-100 '>
      <div
        className='w-full max-w-screen-lg rounded-md bg-white p-10 drop-shadow-2xl'
        key={token}
      >
        {children}
      </div>
    </div>
  );

  const Header = () => (
    <H1 className='mb-10 flex items-center gap-1 border-b-4 border-red-600 pb-6'>
      <span className='flex-1'>{invoiceNumber}</span>
      <Buttons.Close handleClose={handleNextClose} />
    </H1>
  );

  const UI = () => (
    <div className='mt-10 flex gap-3 border-t-4 border-gray-500 pt-6'>
      <div className='w-20'>
        <Buttons.Back disable={current === 0} handleNext={handleNextClose} />
      </div>
      <div className='flex grow justify-center gap-3 '>
        <Buttons.Packed handleUpdate={updateOrder} metadata={metadata} />
        <Buttons.Print
          handleUpdate={updateOrder}
          metadata={metadata}
          image={label_url}
        />
        <Buttons.Shipped handleUpdate={updateOrder} metadata={metadata} />
      </div>
      <div className='w-20'>
        <Buttons.Next
          disable={total - 1 === current}
          metadata={metadata}
          handleNext={handleNextClose}
        />
      </div>
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
