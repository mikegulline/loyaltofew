import { useState, useEffect, useRef, useCallback } from 'react';
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
  setOverlay,
}) {
  const order = orders[current];
  const hideNextButton = orders.length - 1 === current;
  const token = order.token;
  const total = orders.length;
  const label_image = order.metadata.label_url;
  const packed = order.metadata.packed;
  const [isPacked, setIsPacked] = useState(
    () =>
      packed.length ===
      packed.reduce((acc, curr) => Number(curr) + Number(acc), [0])
  );
  const [itemsPacked, setItemsPacked] = useState(packed);

  useEffect(() => {
    setItemsPacked(packed);
  }, [current]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setIsPacked(
      () =>
        itemsPacked.length ===
        itemsPacked.reduce((acc, curr) => Number(curr) + Number(acc), [0])
    );
  }, [itemsPacked]); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(isPacked);

  const updateOrder = async (update) => {
    const { data } = await processOrder(token, update);
    const updated = orders?.map((order, i) => (current === i ? data : order));
    setOrders(updated);
  };

  return (
    <div className=' fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-white'>
      <div className='w-full max-w-screen-lg' key={token}>
        {order.status}
        <OrderHeader order={order}>
          <CountPos current={current} total={total} />
        </OrderHeader>
        <OrderItems
          order={order}
          handleUpdate={updateOrder}
          itemsPacked={itemsPacked}
          setItemsPacked={setItemsPacked}
        />
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

const UI = () => {
  return <></>;
};

const OrderHeader = ({ order, children }) => {
  const { invoiceNumber } = order;
  return (
    <H1 className='flex'>
      <span className='flex-1'>{invoiceNumber}</span>
      {children}
    </H1>
  );
};

const OrderItems = ({ order, handleUpdate, itemsPacked, setItemsPacked }) => {
  const { items, metadata } = order;

  return (
    <ul className='flex justify-center gap-4'>
      {items.map((item, i) => (
        <OrderItem
          key={item.id}
          item={item}
          metadata={metadata}
          itemsPacked={itemsPacked}
          setItemsPacked={setItemsPacked}
          index={i}
          handleUpdate={handleUpdate}
        />
      ))}
    </ul>
  );
};

const OrderItem = ({
  item,
  metadata,
  index,
  handleUpdate,
  itemsPacked,
  setItemsPacked,
}) => {
  const { image, quantity, description } = item;

  const updateItemsPacked = () => {
    const updatePacked = [...itemsPacked];
    updatePacked[index] = updatePacked[index] ? 0 : 1;
    const sendUpdate = {
      metadata: {
        ...metadata,
        packed: updatePacked,
      },
    };
    setItemsPacked(updatePacked);
    handleUpdate(sendUpdate);
  };

  return (
    <li
      className='border-#e4e4e6 flex h-96 w-1/4 cursor-pointer flex-col items-center gap-2 rounded-md border p-4'
      onClick={() => updateItemsPacked()}
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
            <strong>Packed:</strong> {itemsPacked[index]}
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
      <button onClick={() => handlePrint()} className='disabled:opacity-25'>
        Print Label
      </button>
    </div>
  );
};
const ShippedButton = ({ handleUpdate }) => {
  return (
    <button
      onClick={async () => await handleUpdate({ status: 'Shipped' })}
      className='disabled:opacity-25'
    >
      Shipped
    </button>
  );
};

const NextButton = ({ hide, setCurrent }) => {
  return (
    <button
      disabled={hide}
      onClick={() => setCurrent((c) => c + 1)}
      className='disabled:opacity-25'
    >
      Next
    </button>
  );
};
