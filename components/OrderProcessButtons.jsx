import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image';
import {
  SlClose,
  SlCheck,
  SlArrowDownCircle,
  SlPlane,
  SlGrid,
} from 'react-icons/sl';

const Print = ({ image, handleUpdate, metadata }) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const update = {
    status: 'Pending',
    metadata: { ...metadata, status: 'Label Printed' },
  };
  const isPacked =
    metadata.packed.reduce((acc, cur) => Number(acc + cur), [0]) ===
    metadata.packed.length;

  const disable = !isPacked;

  const isPrinted =
    metadata.status === 'Label Printed' || metadata.status === 'Shipped';

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
      <button
        disabled={disable}
        onClick={async () => {
          handlePrint();
          await handleUpdate(update);
        }}
        className={`flex items-center gap-2  disabled:text-black disabled:opacity-25 ${
          isPrinted
            ? 'border-green-600 bg-green-100 text-green-600 hover:border-green-600 hover:bg-green-100 hover:text-green-600'
            : 'hover:bg-black  hover:text-white disabled:bg-white'
        }`}
      >
        Print Label {isPrinted ? <SlCheck /> : <SlArrowDownCircle />}
      </button>
    </>
  );
};

const Close = ({ handleClose }) => {
  return (
    <button
      onClick={() => handleClose()}
      className='bg flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-none bg-[#d61818] text-xl text-white outline-0 hover:bg-black'
    >
      <SlClose />
    </button>
  );
};

const Packed = ({ handleUpdate, metadata }) => {
  const update = {
    status: 'Pending',
    metadata: {
      ...metadata,
      status: 'Packed',
      packed: metadata.packed.map(() => 1),
    },
  };
  const isPacked =
    metadata.packed.reduce((acc, cur) => Number(acc + cur), [0]) ===
    metadata.packed.length;

  return (
    <button
      onClick={async () => await handleUpdate(update)}
      className={`flex items-center gap-2  disabled:text-black disabled:opacity-25 ${
        isPacked
          ? 'border-green-600 bg-green-100 text-green-600 hover:border-green-600 hover:bg-green-100 hover:text-green-600'
          : 'hover:bg-black  hover:text-white disabled:bg-white'
      }`}
    >
      Packed {isPacked ? <SlCheck /> : <SlGrid />}
    </button>
  );
};

const Shipped = ({ handleUpdate, metadata }) => {
  const update = {
    status: 'Shipped',
    metadata: { ...metadata, status: 'Shipped' },
  };
  const disabled = !(
    metadata.status === 'Label Printed' || metadata.status === 'Shipped'
  );
  const isShipped = metadata.status === 'Shipped';
  return (
    <button
      disabled={disabled}
      onClick={async () => await handleUpdate(update)}
      className={`flex items-center gap-2  disabled:text-black disabled:opacity-25 ${
        isShipped
          ? 'border-green-600 bg-green-100 text-green-600 hover:border-green-600 hover:bg-green-100 hover:text-green-600'
          : 'hover:bg-black  hover:text-white disabled:bg-white'
      }`}
    >
      Shipped {isShipped ? <SlCheck /> : <SlPlane />}
    </button>
  );
};

const Next = ({ disable, handleNext, metadata }) => {
  const disabled = metadata.status !== 'Shipped';
  if (disable) {
    return (
      <button
        disabled={disabled}
        onClick={() => handleNext()}
        className='disabled:opacity-25'
      >
        Done
      </button>
    );
  }
  return (
    <button
      disabled={disabled}
      onClick={() => handleNext(1)}
      className='flex items-center gap-2 hover:bg-black  hover:text-white disabled:bg-white disabled:text-black disabled:opacity-25'
    >
      Next
    </button>
  );
};

const Back = ({ disable, handleNext }) => {
  const disabled = disable;
  return (
    <button
      disabled={disabled}
      onClick={() => handleNext(-1)}
      className='flex items-center gap-2 hover:bg-black  hover:text-white disabled:bg-white disabled:text-black disabled:opacity-25'
    >
      Back
    </button>
  );
};

const Buttons = {
  Close,
  Back,
  Packed,
  Print,
  Shipped,
  Next,
};

export default Buttons;
