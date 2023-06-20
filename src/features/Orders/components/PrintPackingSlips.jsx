import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import LogoSVG from '@/public/logos/ltf-logo.svg';
// import handleProcessOrder from '@/utils/handleProcessOrder';

export default function PrintPackingSlips({ orders, callback }) {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  console.log(orders);
  return (
    <>
      <button
        onClick={async () => {
          handlePrint();
        }}
        className='ml-3'
      >
        Print Packing Slips
      </button>
      <div className='hidden'>
        <div ref={componentRef} className=''>
          {orders.map((order) => (
            <div
              key={`print${order.token}`}
              style={{
                width: '8.5in',
                height: '11in',
                padding: '1in',
                border: '1px solid #000',
              }}
              className='flex flex-col justify-between'
            >
              <div>
                <div className='flex items-center justify-between'>
                  <div className='w-[2in]'>
                    <LogoSVG />
                  </div>
                  <div className='text-right'>
                    <p>
                      <strong>Invoice #:</strong> {order.invoiceNumber}
                    </p>
                    <p>
                      <strong>Invoice Date:</strong>{' '}
                      {new Date(order.creationDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <hr className='my-6 border-black bg-black' />
                <h2 className=' underline '>
                  <strong>Ship To:</strong>
                </h2>
                <p className='mb-6'>
                  {order.shippingAddressName}
                  <br />
                  {order.shippingAddressAddress1}
                  {order.shippingAddressAddress2
                    ? `, ${order.shippingAddressAddress2}`
                    : ''}
                  <br />
                  {order.shippingAddressCity}, {order.shippingAddressProvince}{' '}
                  {order.shippingAddressPostalCode}
                </p>
                <p className='mb-6 underline'>
                  <strong>Items Shipped:</strong>
                </p>
                <ul className=''>
                  {order.items.map((item) => (
                    <li
                      key={item.uniqueId}
                      className='ml-6 list-item list-outside'
                    >
                      ({item.quantity}) {item.description}
                      <br />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className=' underline'>
                  <strong>Returns / Exchanges:</strong>
                </p>
                <p className=''>
                  If for some reason, you aren&rsquo;t 100% satisfied with your
                  order and need to initiate a return / exchange, please visit
                  our automated return process at{' '}
                  <u>www.loyaltofew.com/orders</u>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
