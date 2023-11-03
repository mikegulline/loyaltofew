const SizeToggle = ({ sizes, sizeIndex, setSizeIndex }) => {
  if (sizes.length === 1)
    return (
      <ul className='mb-4 flex w-auto shrink-0 lg:mb-6'>
        <li
          className={` flex h-16 w-auto select-none items-center justify-center gap-2 rounded border px-4`}
        >
          <div className='text-xl font-bold'>${sizes[0].price}</div>
          <div className='text-sm'>{sizes[0].size}</div>
        </li>
      </ul>
    );
  const classState = {
    base: ' cursor-pointer border-gray-300 text-gray-500 hover:border-gray-800 hover:bg-gray-800 hover:text-white',
    active: ' cursor-crosshair border-red-600 bg-red-600 text-white',
    disabled: ' border-gray-300 border-dashed text-gray-500 opacity-50',
  };
  return (
    <ul
      className={` ${
        sizes.length > 5 ? 'grid w-[266px] grid-cols-4' : 'flex'
      } mb-4 gap-1 md:flex md:w-auto lg:mb-6`}
    >
      {sizes.map(({ size, price, active }, i) => {
        let setClass = 'base';
        let disabled = false;
        if (!active) {
          setClass = 'disabled';
          disabled = true;
        } else if (sizeIndex === i) {
          setClass = 'active';
        }
        const handleClick = () => setSizeIndex(i);
        return (
          <DisableWrapper
            key={size}
            handleClick={handleClick}
            disabled={disabled}
            className={` flex  h-16 w-16 select-none flex-col items-center justify-center rounded border ${classState[setClass]}`}
          >
            <div className='h-6 text-xl font-bold'>{size}</div>
            <div className='text-sm'>${price}</div>
          </DisableWrapper>
        );
      })}
    </ul>
  );
};

const DisableWrapper = ({ disabled, className, children, handleClick }) => {
  if (disabled) return <li className={className}>{children}</li>;
  return (
    <li onClick={handleClick} className={className}>
      {children}
    </li>
  );
};

export default SizeToggle;
