import { H1 } from '@/components/Type';
import Buttons from './Buttons';

const Header = ({ currentOrder, handleNextClose }) => {
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
    metadata,
  } = currentOrder;

  const totalItems = items.reduce(
    (acc, curr) => Number(acc + curr.quantity),
    [0]
  );
  const date = new Date(creationDate);
  return (
    <div className='mb-8  border-b-4 border-red-600 pb-6'>
      <div className=' absolute left-0 top-0 w-full bg-red-600 text-center  text-sm text-white'>
        RETURNS
      </div>
      <H1 className='mb-4 flex items-center gap-1 text-gray-800'>
        <span className='flex-1'>{invoiceNumber}</span>
        <Buttons.Close handleClose={handleNextClose} />
      </H1>
      <ul className='flex gap-6'>
        <li className='flex flex-col items-center justify-center rounded border border-gray-800 py-2 px-6'>
          <p className='font text-[50px] font-black leading-none text-gray-800'>
            {totalItems}
          </p>
          <p className=' text-xs font-bold uppercase leading-none text-gray-800'>
            Items
          </p>
        </li>
        <li className='flex items-center'>
          <p className='text-gray-800'>
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
          <p className='text-gray-800'>
            <strong>Purchase: ${finalGrandTotal.toFixed(2)}</strong>
            <br />
            {date.toLocaleDateString()} @ {date.toLocaleTimeString()}
            <br />
            {email}
          </p>
        </li>
        {'returnData' in metadata && metadata.returnData.refund > 0 && (
          <li className='flex items-center pl-8'>
            <p className='text-gray-800'>
              <strong>Refund: ${metadata.returnData.refund.toFixed(2)}</strong>
              <br />
              {new Date().toLocaleDateString()} @{' '}
              {new Date().toLocaleTimeString()}
              <br />
              Items: {metadata.returnData.returnQuantity}
            </p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
