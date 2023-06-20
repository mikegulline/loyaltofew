import { useState } from 'react';
import apiOrders from '@/utils/api-orders';
import FormToasts from '@/components/FormToasts';
import PrintPackingSlips from './PrintPackingSlips';

const LoadMore = ({ orderType, orders, setOrders, total, setTotal, limit }) => {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLoadMore = async () => {
    try {
      setFetching('Fetching orders…');
      setSuccess('');
      setError('');

      const data = await apiOrders(orderType, limit, orders.length);

      setTotal(data.totalItems);
      setOrders([...orders, ...data.items]);
      setFetching(false);
      setSuccess(`Loaded ${data.items.length} orders!`);
      setTimeout(() => {
        setSuccess('');
      }, 1000);
    } catch (errors) {
      console.log(errors);
      setFetching(false);
      setError(errors);
    }
  };

  const disabled = fetching || total === orders.length;
  const countToLoad = total - orders.length;
  const loadMore = countToLoad > limit ? limit : countToLoad;

  const formToastsProps = {
    fetching,
    error,
    success,
  };

  return (
    <>
      <div className='flex justify-center '>
        <button
          disabled={disabled}
          onClick={() => handleLoadMore()}
          className='flex items-center gap-2 hover:bg-black  hover:text-white disabled:bg-white disabled:text-black disabled:opacity-25'
        >
          Load More {loadMore > 0 && loadMore}
        </button>
        {orderType === 'Processed' && <PrintPackingSlips orders={orders} />}
      </div>
      <FormToasts {...formToastsProps} />
    </>
  );
};

export default LoadMore;
