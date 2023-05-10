const SizeToggle = ({ sizes, index, setIndex }) => {
  if (sizes.length === 1)
    return (
      <ul className='mb-4 flex w-auto shrink-0 lg:mb-6'>
        <li
          className={` flex h-16 w-auto select-none items-center justify-center gap-2 rounded border px-4`}
        >
          <div className='text-xl font-bold'>${sizes[index].price}</div>
          <div className='text-sm'>{sizes[index].size}</div>
        </li>
      </ul>
    );

  return (
    <ul
      className={` ${
        sizes.length > 5 ? 'grid w-[266px] grid-cols-4' : 'flex'
      } mb-4 gap-1 md:flex md:w-auto lg:mb-6`}
    >
      {sizes.map(({ size, price }, i) => {
        return (
          <li
            key={size}
            onClick={() => {
              setIndex(i);
            }}
            className={` flex  h-16 w-16 select-none flex-col items-center justify-center rounded border   ${
              index === i
                ? ' cursor-crosshair border-red-600 bg-red-600 text-white'
                : 'cursor-pointer border-gray-300 text-gray-500 hover:border-gray-800 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <div className='h-6 text-xl font-bold'>{size}</div>
            <div className='text-sm'>${price}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default SizeToggle;
