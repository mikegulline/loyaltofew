import { H1 } from '@/components/Type';
import Buttons from './Buttons';

const Header = ({ currentOrder, handleClose, fetching }) => {
  const {
    finalGrandTotal,
    items,
    invoiceNumber,
    creationDate,
    shippingAddressName,
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
      <Buttons.Close handleClose={handleClose} />
      <ul className='flex gap-6'>
        <li className='flex'>
          <p className='text-gray-800'>
            <strong>{invoiceNumber}</strong>

            <br />
            <a
              href={`mailto: ${email}`}
              title={`Click to email ${shippingAddressName}`}
              className='text-red-600 underline'
            >
              {shippingAddressName}
            </a>
          </p>
        </li>
        <li className='flex pl-8'>
          <p className='text-gray-800'>
            <strong>Purchase: ${finalGrandTotal.toFixed(2)}</strong>
            <br />
            Items: {totalItems}
            <br />
            {date.toLocaleDateString()}
          </p>
        </li>
        {'returnData' in metadata && metadata.returnData.refund > 0 && (
          <li className='flex pl-8'>
            <p className='text-gray-800'>
              <strong>Refund: ${metadata.returnData.refund.toFixed(2)}</strong>
              <br />
              Items: {metadata.returnData.returnQuantity}
              <br />
              {!metadata.returnData?.labelSent
                ? 'Click Start Return to process'
                : metadata.returnData?.labelSent}
            </p>
          </li>
        )}
        {'returnInfos' in metadata && metadata.returnInfos?.label_url ? (
          <li className='flex pl-8'>
            <p className='text-gray-800'>
              <strong>{metadata.returnData.status}</strong>
              <br />
              <a
                href={metadata.returnInfos.label_url}
                title='Click to view shipping label'
                className='text-red-600 underline'
                target='_blank'
                rel='noreferrer'
              >
                Shipping Label
              </a>{' '}
              (${metadata.returnInfos?.rate})
              <br />
              <a
                href={metadata.returnInfos.tracking_url}
                title='Click to track package'
                className='text-red-600 underline'
                target='_blank'
                rel='noreferrer'
              >
                Track Package
              </a>
            </p>
          </li>
        ) : (
          <li className='flex items-center pl-8 '>
            {fetching && (
              <p className='text-gray-800'>Getting label and tracking…</p>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
