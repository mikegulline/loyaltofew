import { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image';
import { H1 } from '../../../../components/Type';
import { SlClose } from 'react-icons/sl';
import processOrder from '../../../../utils/processOrder';

export default function OrderProcessOverlay({
  orders,
  setOrders,
  current,
  setCurrent,
  overlay,
  setOverlay,
}) {
  if (current === null || !overlay) return <></>;

  const hideNextButton = orders.length - 1 === current;
  const order = orders[current];
  const token = order.token;
  const total = orders.length;
  const label_image = order?.metadata?.label_url;

  const updateOrder = async (update) => {
    const { data } = await processOrder(token, update);
    const updated = orders?.map((order, i) => (current === i ? data : order));
    setOrders(updated);
  };

  return (
    <div className=' fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-white'>
      <div className='w-full max-w-screen-lg'>
        {order.status}
        <OrderHeader order={order}>
          <CountPos current={current} total={total} />
        </OrderHeader>
        <OrderItems order={order} handleUpdate={updateOrder} />
        <CloseButton setOverlay={setOverlay} />
        <div className='flex justify-end gap-3 pt-20'>
          <PackedButton token={token} />
          <PrintButton token={token} image={label_image} />
          <ShippedButton handleUpdate={updateOrder} />
          <NextButton hide={hideNextButton} setCurrent={setCurrent} />
        </div>
      </div>
    </div>
  );
}

const OrderHeader = ({ order, children }) => {
  const { invoiceNumber } = order;
  return (
    <H1 className='flex'>
      <span className='flex-1'>{invoiceNumber}</span>
      {children}
    </H1>
  );
};

const OrderItems = ({ order, handleUpdate }) => {
  const { items, metadata } = order;
  return (
    <ul className='flex justify-center gap-4'>
      {items.map((item, i) => (
        <OrderItem
          item={item}
          key={item.id}
          metadata={metadata}
          index={i}
          handleUpdate={handleUpdate}
        />
      ))}
    </ul>
  );
};

const OrderItem = ({ item, metadata, index, handleUpdate }) => {
  const { image, id, quantity, description } = item;
  const packed = metadata.packed;
  const updatePacked = [...packed];
  updatePacked[index] = updatePacked[index] ? 0 : 1;
  const sendUpdate = {
    metadata: {
      ...metadata,
      packed: updatePacked,
    },
  };
  return (
    <li
      key={id}
      className='border-#e4e4e6 flex h-96 w-1/4 flex-col items-center gap-2 rounded-md border p-4'
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
          <div onClick={() => handleUpdate(sendUpdate)}>
            <strong>Quantity:</strong> {quantity}
            <strong>Packed:</strong> {packed[index]}
          </div>
        </li>
      </ul>
    </li>
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

const PrintButton = ({ image }) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <div className='hidden'>
        <div ref={componentRef} className='p-[.25in]'>
          <Image
            src={image}
            width={1200}
            height={1800}
            className='h-[6in] w-[4in]'
            alt='shipping label'
          />
        </div>
      </div>
      <button onClick={() => handlePrint()}>Print Label</button>
    </div>
  );
};
const ShippedButton = ({ handleUpdate }) => {
  return (
    <button onClick={async () => await handleUpdate({ status: 'Shipped' })}>
      Shipped
    </button>
  );
};

const NextButton = ({ hide, setCurrent }) => {
  return (
    <button disabled={hide} onClick={() => setCurrent((c) => c + 1)}>
      Next
    </button>
  );
};
