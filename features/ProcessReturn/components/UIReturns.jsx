import { useState } from 'react';
import Buttons from './Buttons';
import axios from 'axios';

const UIShipping = ({ metadata, currentOrder, updateOrder }) => {
  const [fetching, setFetching] = useState(false);
  const handleClickStartReturn = async () => {
    setFetching(true);

    const status = 'Return Started';
    const update = {
      metadata: {
        ...metadata,
        returnData: {
          ...metadata?.returnData,
          labelSent: true,
        },
        status,
      },
    };

    const { totalWeight, refund } = metadata.returnData;

    const {
      shippingAddressName,
      shippingAddressCompanyName,
      shippingAddressAddress1,
      shippingAddressAddress2,
      shippingAddressCity,
      shippingAddressCountry,
      shippingAddressProvince,
      shippingAddressPostalCode,
      shippingAddressPhone,
      token,
    } = currentOrder;
    // return console.log(currentOrder);

    const body = {
      content: {
        shippingAddressName,
        shippingAddressCompanyName,
        shippingAddressAddress1,
        shippingAddressAddress2,
        shippingAddressCity,
        shippingAddressCountry,
        shippingAddressProvince,
        shippingAddressPostalCode,
        shippingAddressPhone,
        totalWeight,
        refund,
        token,
      },
    };

    try {
      const { data } = await axios.post('/api/webhooks/startReturn', body);

      // buy shipping

      console.log(data);
    } catch (error) {
      return console.log('error getting shipping', error);
    }

    //await updateOrder(update);
  };

  const handleClickIssueRefund = async () => {
    const status = 'Refund Issued';
    const update = {
      metadata: {
        ...metadata,
        returnData: {
          ...metadata?.returnData,
          refundIssued: true,
        },
        status,
      },
    };
    await updateOrder(update);
  };

  return (
    <div className='mt-10 flex gap-3 border-t-4 border-gray-500 pt-6'>
      <div className='flex grow justify-center gap-3 '>
        <Buttons.StartReturn
          handleUpdate={handleClickStartReturn}
          metadata={metadata}
        />
        <Buttons.IssueRefund
          handleUpdate={handleClickIssueRefund}
          metadata={metadata}
        />
      </div>
    </div>
  );
};

export default UIShipping;
