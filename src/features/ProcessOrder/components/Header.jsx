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
  } = currentOrder;

  const totalItems = items.reduce(
    (acc, curr) => Number(acc + curr.quantity),
    [0]
  );
  const date = new Date(creationDate);
  return (
    <div className='mb-10  border-b-4 border-red-600 pb-6'>
      <div className=' absolute left-0 top-0 w-full bg-gray-800 text-center  text-sm text-white'>
        SHIPPING
      </div>
      <H1 className='mb-4 flex items-center gap-1 text-gray-800 '>
        <span className='flex-1'>{invoiceNumber}</span>
        <Buttons.Close handleClose={handleNextClose} />
      </H1>
      <ul className='flex gap-6'>
        <li className='flex flex-col items-center justify-center rounded border border-[#333] py-2 px-6'>
          <p className='font text-[50px] font-black leading-none text-gray-800'>
            {totalItems}
          </p>
          <p className=' text-xs font-bold uppercase leading-none text-gray-800'>
            Itmes
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

export default Header;
