const GridBlock = ({ name, children }) => {
  return (
    <div className='relative mb-16 xl:mb-24 '>
      <div className='mb-8 flex items-center justify-between'>
        <h2 className='relative pb-2 text-xl font-black uppercase after:absolute after:bottom-0 after:left-0 after:block after:h-1 after:w-16 after:bg-red-700'>
          {name}
        </h2>
      </div>
      <div className='mb-8 grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4  xl:gap-8'>
        {children}
      </div>
    </div>
  );
};

export default GridBlock;
