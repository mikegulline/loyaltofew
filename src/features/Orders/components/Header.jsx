import { H1 } from '@/components/Type';

const Header = ({ orders, total, setOrderType }) => {
  const orderTypes = [
    // ['InProgress', 'Shopping'],
    ['Processed', 'New'],
    ['Pending', 'Processed'],
    ['Shipped', 'Shipped'],
    ['Delivered', 'Delivered'],
    // ['Disputed': 'Disputed'],
    // ['Cancelled', 'Cancelled'],
  ];
  return (
    <div className='mt-10 flex items-center gap-6 text-gray-800'>
      <H1 className='grow'>
        <span>Orders</span>
      </H1>

      <span className='flex items-baseline gap-6'>
        <span className='text-base'>
          {orders.length} of {total}
        </span>
        <select name='orderType' onChange={(e) => setOrderType(e.target.value)}>
          {orderTypes.map((orderType) => (
            <option key={orderType[0]} value={orderType[0]}>
              {orderType[1]}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
};

export default Header;
