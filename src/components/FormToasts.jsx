import { SlRefresh, SlCheck } from 'react-icons/sl';

const FormToasts = ({ fetching, error, success }) => {
  return (
    <div
      className={`relative transition-all duration-500 ${
        fetching || error || success ? 'h-24' : 'h-0'
      }`}
    >
      <div
        className={` absolute mt-5 mb-4 w-full rounded border border-red-600 bg-red-50 px-5 py-2 text-red-900 ${
          error
            ? ' translate-y-0  opacity-100  transition-all duration-500'
            : ' translate-y-10  opacity-0'
        }`}
      >
        {error}
      </div>
      <div
        className={` absolute mt-5 mb-4 flex w-full items-center gap-2 rounded border border-green-600 bg-green-50 px-5 py-2 text-green-900 ${
          success
            ? ' translate-y-0  opacity-100  transition-all duration-500'
            : ' translate-y-10  opacity-0'
        }`}
      >
        <SlCheck />
        {success}
      </div>
      <div
        className={` absolute mt-5 mb-4  flex w-full items-center gap-2 rounded border border-gray-600 bg-gray-50 px-5 py-2 text-gray-900 ${
          fetching
            ? ' translate-y-0  opacity-100  transition-all duration-500'
            : ' translate-y-10  opacity-0'
        }`}
      >
        <div className='animate-spin'>
          <SlRefresh className='-scale-x-100' />
        </div>{' '}
        {fetching}
      </div>
    </div>
  );
};

export default FormToasts;
