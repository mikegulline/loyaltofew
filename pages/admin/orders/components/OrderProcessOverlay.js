import { useState, useEffect } from 'react';
import Image from 'next/image';
import { H1 } from '../../../../components/Type';
import { SlClose } from 'react-icons/sl';
import axios from 'axios';

export default function OrderProcessOverlay({
  orders,
  current,
  setCurrent,
  overlay,
  setOverlay,
}) {
  if (current === null || !overlay) return <></>;

  const hideNextButton = orders.length - 1 === current;

  const processOrder = async (token) => {
    console.log('trying');
    try {
      const setStatus = {
        status: 'Shipped',
      };
      const secret = process.env.SNIPCART_SECRET + ':';
      await axios.put(
        `https://app.snipcart.com/api/orders/${token}`,
        setStatus,
        {
          headers: {
            Authorization: `Basic ${btoa(secret)}`,
            Accept: 'application/json',
          },
        }
      );
    } catch (errors) {
      console.log({ message: 'set status shipped', errors });
    }
  };

  return (
    <div className=' fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-white'>
      <div className='w-full max-w-screen-lg'>
        <OrderDetail order={orders[current]}>
          <CountPos current={current} total={orders.length} />
        </OrderDetail>
        <CloseButton setOverlay={setOverlay} />
        <div className='flex justify-end gap-3 pt-20'>
          <PackedButton />
          <PrintButton />
          <ShippedButton
            handleClick={processOrder}
            token={orders[current].token}
          />
          <NextButton hide={hideNextButton} setCurrent={setCurrent} />
        </div>
      </div>
    </div>
  );
}

const OrderDetail = ({ order, children }) => {
  const { invoiceNumber, finalGrandTotal, metadata, items } = order;
  return (
    <div>
      <H1 className='flex'>
        <span className='flex-1'>{invoiceNumber}</span>
        {children}
      </H1>
      <OrderItems items={items} />
    </div>
  );
};

const OrderItems = ({ items }) => {
  return (
    <ul className='flex justify-center gap-4'>
      {items.map((item) => {
        const { image, id, quantity, description } = item;

        return (
          <li
            key={id}
            className='first-letter: border-#e4e4e6 flex h-96 w-1/4 flex-col items-center gap-2 rounded-md border p-4'
          >
            <div>
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
            </div>
            <ul className='flex flex-1 flex-col'>
              <li>{description}</li>
              <li className='flex flex-1 flex-col justify-end'>
                <div>
                  <strong>Quantity:</strong> {quantity}
                </div>
              </li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

const CountPos = ({ total, current }) => {
  return (
    <span style={{ color: '#e4e4e6' }}>
      {current + 1}/{total}
    </span>
  );
};

const CloseButton = ({ setOverlay }) => {
  return (
    <div
      onClick={() => setOverlay(false)}
      className='bg absolute top-10 right-10 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#d61818] text-xl text-white hover:bg-black'
    >
      <SlClose />
    </div>
  );
};

const PackedButton = () => {
  return <button>Packed</button>;
};

const PrintButton = () => {
  return <button>Print Label</button>;
};
const ShippedButton = ({ handleClick, token }) => {
  return <button onClick={() => handleClick(token)}>Shipped</button>;
};

const NextButton = ({ hide, setCurrent }) => {
  return (
    <button disabled={hide} onClick={() => setCurrent((c) => c + 1)}>
      Next
    </button>
  );
};
