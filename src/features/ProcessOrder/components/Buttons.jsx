import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image';
import { SlClose, SlCheck, SlArrowDownCircle, SlGrid } from 'react-icons/sl';

const Print = ({ image, handleUpdate, metadata }) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const update = {
    metadata: { ...metadata, status: 'Label Printed' },
  };
  const isPacked =
    metadata.packed.reduce((acc, cur) => Number(acc + cur), [0]) ===
    metadata.packed.length;

  const isPrinted = metadata.status === 'Label Printed';

  const isDisabled = !isPacked;

  return (
    <>
      <div className='hidden'>
        <div ref={componentRef} className=''>
          <Image
            src={image}
            width={1200}
            height={1800}
            className='h-full w-full'
            alt='shipping label'
          />
        </div>
      </div>
      <button
        disabled={isDisabled}
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

const Pending = ({ handleUpdate, metadata }) => {
  const update = {
    status: 'Pending',
    metadata: {
      ...metadata,
    },
  };
  const isPacked =
    metadata.packed.reduce((acc, cur) => Number(acc + cur), [0]) ===
    metadata.packed.length;

  const isDisabled = metadata.status !== 'Label Printed';

  console.log(metadata);
  return (
    <button
      disabled={isDisabled}
      onClick={async () => await handleUpdate(update)}
      className={`flex items-center gap-2  disabled:text-black disabled:opacity-25 ${
        !isDisabled
          ? 'border-green-600 bg-green-100 text-green-600 hover:border-green-600 hover:bg-green-100 hover:text-green-600'
          : 'hover:bg-black  hover:text-white disabled:bg-white'
      }`}
    >
      Ready to Ship
    </button>
  );
};

const Packed = ({ handleUpdate, metadata }) => {
  const update = {
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
      disabled={isPacked}
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

const Next = ({ disable, handleNext }) => {
  if (disable) {
    return (
      <button
        onClick={() => handleNext()}
        className='flex w-full items-center gap-2 border-red-600 text-center  text-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white '
      >
        Done
      </button>
    );
  }
  return (
    <button
      onClick={() => handleNext(1)}
      className='flex w-full items-center gap-2  text-center hover:bg-black hover:text-white disabled:bg-white disabled:text-black disabled:opacity-25'
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
      className='flex w-full items-center gap-2  text-center hover:bg-black hover:text-white disabled:bg-white disabled:text-black disabled:opacity-25'
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
  Pending,
  Next,
};

export default Buttons;
