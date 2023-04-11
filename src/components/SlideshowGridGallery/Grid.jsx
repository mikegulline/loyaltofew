const Grid = ({ children }) => {
  return (
    <div className='grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-4  xl:gap-8'>
      {children}
    </div>
  );
};

export default Grid;
