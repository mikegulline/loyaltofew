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

  if (!order) return <></>;
  const {
    token,
    items,
    metadata,
    metadata: { label_url },
  } = currentOrder;

  const updateOrder = async (update) => {
    setCurrentOrder({ ...currentOrder, ...update });
    const { data } = await processOrder(token, update);
    return data;
  };

  const handleNextClose = (next) => nextClose(currentOrder, next);

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

  const Header = () => {
    const {
      finalGrandTotal,
      items,
      invoiceNumber,
      creationDate,
      shippingAddressName,
      shippingAddressAddress1,
      shippingAddressAddress2,
      shippingAddressPostalCode,
      shippingAddressProvince,
      shippingAddressCity,
      email,
    } = currentOrder;
    console.log(currentOrder);
    const totalItems = items.reduce(
      (acc, curr) => Number(acc + curr.quantity),
      [0]
    );
    const date = new Date(creationDate);
    return (
      <div className='mb-10  border-b-4 border-red-600 pb-6'>
        <H1 className='mb-4 flex items-center gap-1 '>
          <span className='flex-1'>{invoiceNumber}</span>
          <Buttons.Close handleClose={handleNextClose} />
        </H1>
        <ul className='flex gap-6'>
          <li className='flex flex-col items-center justify-center rounded border border-[#333] py-2 px-6'>
            <p className='font text-[50px] font-black leading-none'>
              {totalItems}
            </p>
            <p className=' text-xs font-bold uppercase leading-none'>Itmes</p>
          </li>
          <li className='flex items-center'>
            <p>
              <strong>{shippingAddressName}</strong>
              <br />
              {shippingAddressAddress1}{' '}
              {shippingAddressAddress2 ? shippingAddressAddress2 : ''}
              <br />
              {shippingAddressCity}, {shippingAddressProvince}{' '}
              {shippingAddressPostalCode}
            </p>
          </li>
          <li className='flex items-center pl-8'>
            <p>
              <strong>${finalGrandTotal}</strong>
              <br />
              {date.toLocaleDateString()} @ {date.toLocaleTimeString()}
              <br />
              {email}
            </p>
          </li>
        </ul>
      </div>
    );
  };

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
          disable={Number(total - 1) === current}
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

  const classes = isPacked
    ? 'border-green-600 bg-green-100 '
    : 'border-gray-200 transition-all duration-300 hover:scale-105 hover:border-gray-400';

  const Wrapper = ({ children }) => (
    <li
      className={`${classes} border-#e4e4e6 group flex h-96 w-1/4 cursor-pointer flex-col items-center gap-2 rounded-md border p-4`}
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
      className={`rounded  border  bg-[#e4e4e6] p-2 ${
        isPacked ? `border-green-600` : `border-white`
      }`}
    />
  );

  const Infos = () => (
    <ul className='flex flex-1 flex-col'>
      <li>{description}</li>
      <li></li>
      <li className='flex flex-1 flex-col justify-end'>
        <div className='flex'>
          <strong>Quantity:</strong> {quantity}
          <div className='grow'></div>
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
