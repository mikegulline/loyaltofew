const getSizeClass = (size) => {
  let returnSize;

  switch (size) {
    case 'large':
    case 'lg':
      returnSize = 'px-0 w-full 2xl:max-w-screen-2xl';
      break;
    case 'small':
    case 'sm':
      returnSize = 'px-4 w-full md:max-w-screen-md lg:max-w-screen-lg';
      break;
    case 'extra small':
    case 'extrasmall':
    case 'xs':
      returnSize = 'px-4 w-full md:max-w-screen-md md:max-w-screen-md';
      break;
    default:
      returnSize =
        'px-4 w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl';
  }

  return returnSize;
};

const Container = ({ children, className, size }) => {
  const passSizeClass = getSizeClass(size);
  const passClassName = className ? className : '';
  return (
    <div className={`mx-auto   ${passSizeClass} ${passClassName}`}>
      {children}
    </div>
  );
};

export default Container;
