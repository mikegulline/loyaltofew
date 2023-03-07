import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image';
import { SlClose } from 'react-icons/sl';

const Print = ({ image }) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <div className='hidden'>
        <div ref={componentRef} className='p-[.25in]'>
          <Image
            src={image}
            width={1200}
            height={1800}
            className='h-[6in] w-[4in]'
            alt='shipping label'
          />
        </div>
      </div>
      <button onClick={() => handlePrint()} className='disabled:opacity-25'>
        Print Label
      </button>
    </>
  );
};

const Close = ({ handleClose }) => {
  return (
    <button
      onClick={() => handleClose(true)}
      className='bg absolute top-10 right-10 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-none bg-[#d61818] text-xl text-white outline-0 hover:bg-black'
    >
      <SlClose />
    </button>
  );
};

const Packed = () => {
  return <button>Packed</button>;
};

const Shipped = ({ handleUpdate }) => {
  return (
    <button
      onClick={async () => await handleUpdate({ status: 'Shipped' })}
      className='disabled:opacity-25'
    >
      Shipped
    </button>
  );
};

const Next = ({ disable, handleNext }) => {
  return (
    <button
      disabled={disable}
      onClick={() => handleNext()}
      className='disabled:opacity-25'
    >
      Next
    </button>
  );
};

const Buttons = {
  Close,
  Packed,
  Print,
  Shipped,
  Next,
};

export default Buttons;
