import { SlClose, SlCheck } from 'react-icons/sl';

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

const StartReturn = ({ handleUpdate, metadata }) => {
  const isReturnStarted = metadata?.returnData?.labelSent;

  const disabled = !metadata?.returnData?.returnQuantity || isReturnStarted;

  return (
    <button
      disabled={disabled}
      onClick={async () => await handleUpdate()}
      className={`flex items-center gap-2  disabled:text-black disabled:opacity-25 ${
        isReturnStarted
          ? 'border-green-600 bg-green-100 text-green-600 hover:border-green-600 hover:bg-green-100 hover:text-green-600'
          : 'hover:bg-black  hover:text-white disabled:bg-white'
      }`}
    >
      Start Return {isReturnStarted ? <SlCheck /> : null}
    </button>
  );
};

const IssueRefund = ({ handleUpdate, metadata }) => {
  const isRefunded = metadata?.returnData?.refundIssued;

  const disabled = !metadata?.returnData?.labelSent || isRefunded;

  return (
    <button
      disabled={disabled}
      onClick={async () => await handleUpdate()}
      className={`flex items-center gap-2  disabled:text-black disabled:opacity-25 ${
        isRefunded
          ? 'border-green-600 bg-green-100 text-green-600 hover:border-green-600 hover:bg-green-100 hover:text-green-600'
          : 'hover:bg-black  hover:text-white disabled:bg-white'
      }`}
    >
      Issue Refund {isRefunded ? <SlCheck /> : null}
    </button>
  );
};

const Buttons = {
  Close,
  StartReturn,
  IssueRefund,
};

export default Buttons;
