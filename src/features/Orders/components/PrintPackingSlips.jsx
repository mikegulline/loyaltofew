import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import LogoSVG from '@/public/logos/ltf-logo.svg';
// import handleProcessOrder from '@/utils/handleProcessOrder';

export default function PrintPackingSlips({
  as,
  orders,
  callback,
  children,
  className,
}) {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const Component = as || 'button';

  const isDisabled = orders.length === 0;

  return (
    <>
      <Component
        disabled={isDisabled}
        onClick={async () => {
          handlePrint();
          if (callback) await callback();
        }}
        className={className && className}
      >
        {children}
        {isDisabled}
      </Component>
      <div className='hidden'>
        <div ref={componentRef} className=''>
          <div
            style={{
              width: '8.5in',
              height: '11in',
              padding: '1in',
              border: '1px solid #000',
            }}
            className='flex flex-col justify-between'
          >
            <div>
              <Inventory orders={orders} />
            </div>
            <div></div>
          </div>
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

const Inventory = ({ orders }) => {
  const returnOrders = {};
  let countOrders = 0;

  orders.map(({ items }) => {
    items.map(({ id, quantity }) => {
      const baseId = convertId(id);
      countOrders += quantity;
      if (baseId in returnOrders) {
        returnOrders[baseId] += quantity;
      } else {
        returnOrders[baseId] = quantity;
      }
    });
  });

  let htmlOrders = [];

  for (const key in returnOrders) {
    htmlOrders.push(`- (${returnOrders[key]}) ${key}`);
  }

  return (
    <>
      <h1 className='mb-6 text-xl font-bold'>LTF Inventory Update</h1>
      <p className='mb-6'>You got {countOrders} orders in the past 24hrs!</p>
      <p className='mb-6'>
        <strong>Time to place an order for:</strong>
      </p>
      <div className='mb-6'>
        {htmlOrders.map((order) => (
          <p key={order}>{order}</p>
        ))}
      </div>
      <p>Keep it up, Champ!</p>
      <p>LTF Robot</p>
    </>
  );
};

const convertId = (id) => {
  const splitId = id.split(':');
  splitId.splice(-2, 1);
  return splitId.join(':');
};
