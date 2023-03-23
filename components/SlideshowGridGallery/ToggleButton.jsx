const ToggleButton = ({ handleClick, children }) => (
  <div
    className='cursor-pointer text-red-600 underline hover:text-gray-900'
    onClick={() => handleClick((current) => !current)}
  >
    {children}
  </div>
);

export default ToggleButton;
