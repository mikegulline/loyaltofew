import Image from 'next/image';

const OrderItem = ({ item, isPacked, handleUpdateItemsPacked }) => {
  const { image, quantity, description } = item;

  const classes = isPacked
    ? 'border-green-600 bg-green-100 '
    : 'border-gray-200 transition-all duration-300 hover:scale-105 hover:border-gray-400';

  const Wrapper = ({ children }) => (
    <li
      className={`${classes} border-#e4e4e6 group flex h-96 w-1/4 cursor-pointer flex-col items-center gap-2 rounded-md border p-4`}
      onClick={() => handleUpdateItemsPacked()}
    >
      {children}
    </li>
  );

  const Thumbnail = () => (
    <Image
      src={image}
      width={210}
      height={210}
      alt={''}
      className={`rounded  border  bg-[#e4e4e6] p-2 ${
        isPacked ? `border-green-600` : `border-white`
      }`}
    />
  );

  const Infos = () => (
    <ul className='flex flex-1 flex-col'>
      <li>{description}</li>
      <li></li>
      <li className='flex flex-1 flex-col justify-end'>
        <div className='flex'>
          <strong>Quantity:</strong> {quantity}
          <div className='grow'></div>
        </div>
      </li>
    </ul>
  );

  return (
    <Wrapper>
      <Thumbnail />
      <Infos />
    </Wrapper>
  );
};

export default OrderItem;
