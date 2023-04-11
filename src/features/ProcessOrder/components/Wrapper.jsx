const Wrapper = ({ token, children }) => (
  <div className=' fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-gray-100 '>
    <div
      className='w-full max-w-screen-lg rounded-md bg-white p-10 drop-shadow-2xl'
      key={`wrapper${token}`}
    >
      {children}
    </div>
  </div>
);

export default Wrapper;
