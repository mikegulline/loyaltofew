import Sizes from './Sizes';
import Buttons from './Buttons';

const SelectSize = ({ product, handleChange, index }) => {
  return (
    <>
      <p className='mb-2 font-bold'>Size Options</p>
      <div className='buttons flex gap-1'>
        <Sizes product={product} handleChange={handleChange} />
        <Buttons product={product} index={index} />
      </div>
    </>
  );
};

export default SelectSize;
