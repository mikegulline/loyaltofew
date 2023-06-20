import { useState, useEffect, useRef } from 'react';
import PrintPackingSlips from './PrintPackingSlips';

const OrdersList = ({ orders, setCurrent }) => {
  const heightRef = useRef(null);
  const [currentHeight, setCurrentHeight] = useState(0);

  useEffect(() => {
    setCurrentHeight(heightRef.current.offsetHeight);
  }, [orders.length]);

  return (
    <div className='my-6 border-y-4 border-red-600 border-b-gray-500 py-6'>
      <div
        className={`relative overflow-hidden transition-all delay-1000 duration-1000 ease-in-out`}
        style={{ height: currentHeight ? `${currentHeight}px` : `auto` }}
      >
        <div ref={heightRef}>
          <ul className=' flex flex-col gap-1'>
            {orders?.map((order, i) => {
              const {
                token,
                finalGrandTotal,
                items,
                invoiceNumber,
                shippingAddressName,
                shippingAddressProvince,
              } = order;

              const totalItems = items.reduce(
                (acc, curr) => Number(acc + curr.quantity),
                [0]
              );
              return (
                <li
                  key={token}
                  onClick={() => {
                    setCurrent(i);
                  }}
                  className={`flex h-20 cursor-pointer items-center gap-4 rounded border px-4 hover:border-green-600 hover:bg-green-100`}
                >
                  <div className='w-20'>
                    <strong>{invoiceNumber}</strong>
                  </div>
                  <div className='w-36 truncate'>
                    {shippingAddressName}
                    {order.metadata?.print_packing_slip ? (
                      <div className='text-xs text-gray-400'>
                        Packing Slip Printed
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className='w-16'>{shippingAddressProvince}</div>
                  <div>Items: {totalItems}</div>
                  <div></div>

                  <div className='flex grow justify-end'>
                    ${finalGrandTotal}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
