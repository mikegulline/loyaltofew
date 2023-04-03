import { H1 } from '../../../components/Type';

const Header = ({ orders, total }) => (
  <H1 className='mt-10 flex items-center text-gray-800'>
    <span className='grow'>Orders</span>{' '}
    <span className='text-base text-gray-200 md:text-7xl'>
      {orders.length} of {total}
    </span>
  </H1>
);

export default Header;
