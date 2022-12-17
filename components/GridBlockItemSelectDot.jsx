const GridBlockItemSelectDot = ({ current }) => {
  return (
    <div
      className='absolute top-4 right-4 block h-8 w-8 scale-0 transform rounded-full bg-white shadow-lg'
      style={{ transform: `scale(${current ? 1 : 0})` }}
    ></div>
  );
};

export default GridBlockItemSelectDot;
