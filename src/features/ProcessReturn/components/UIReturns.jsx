import { useState } from 'react';
import Buttons from './Buttons';
import axios from 'axios';

const UIReturns = ({
  metadata,
  currentOrder,
  updateOrder,
  setStatus,
  fetching,
  setFetching,
}) => {
  const handleClickStartReturn = async () => {
    setFetching(true);

    try {
      const { data } = await axios.post('/api/admin/return-start', {
        ...metadata,
        email: currentOrder.email,
        invoiceNumber: currentOrder.invoiceNumber,
      });

      const status = 'RETURN STARTED';
      const update = {
        metadata: {
          ...metadata,
          returnData: {
            ...metadata?.returnData,
            labelSent: new Date().toLocaleDateString(),
            status,
          },
          returnInfos: {
            ...data,
          },
        },
      };
      setStatus(status);
      await updateOrder(update);
    } catch (error) {
      return console.log('error getting shipping', error);
    } finally {
      setFetching(false);
    }
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
          fetching={fetching}
        />
        <Buttons.IssueRefund
          handleUpdate={handleClickIssueRefund}
          metadata={metadata}
          fetching={fetching}
        />
      </div>
    </div>
  );
};

export default UIReturns;
