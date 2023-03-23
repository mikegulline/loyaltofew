const TitleWrapper = ({ children }) => {
  return (
    <div className='relative mb-8 flex items-start justify-between after:absolute after:bottom-0 after:left-0 after:block after:h-1 after:w-16 after:bg-red-600'>
      {children}
    </div>
  );
};

export default TitleWrapper;
