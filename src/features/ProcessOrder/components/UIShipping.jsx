import Buttons from './Buttons';

const UIShipping = ({
  current,
  total,
  metadata,
  updateOrder,
  label_url,
  handleNextClose,
}) => (
  <div className='mt-10 flex gap-3 border-t-4 border-gray-500 pt-6'>
    <div className='w-20'>
      <Buttons.Back disable={current === 0} handleNext={handleNextClose} />
    </div>
    <div className='flex grow justify-center gap-3 '>
      <Buttons.Packed handleUpdate={updateOrder} metadata={metadata} />
      <Buttons.Print
        handleUpdate={updateOrder}
        metadata={metadata}
        image={label_url}
      />
      <Buttons.Shipped handleUpdate={updateOrder} metadata={metadata} />
    </div>
    <div className='w-20'>
      <Buttons.Next
        disable={Number(total - 1) === current}
        handleNext={handleNextClose}
      />
    </div>
  </div>
);

export default UIShipping;
