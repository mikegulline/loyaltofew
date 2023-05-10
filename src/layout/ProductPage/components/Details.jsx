import { useState } from 'react';

const Details = ({ details, thisKey = '' }) => {
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <>
        <p
          onClick={() => setShow(false)}
          className=' mb-4 cursor-pointer select-none text-red-600 underline hover:text-gray-900 lg:mb-6'
        >
          Hide
        </p>
        <ul className='ml-3 mb-4 list-disc pl-3 text-gray-900 lg:mb-6'>
          {details.map((info, i) => (
            <li key={`${thisKey}-${i}`}>{info}</li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <p
      onClick={() => setShow(true)}
      className=' mb-4 cursor-pointer select-none text-gray-900 underline hover:text-red-600 lg:mb-6'
    >
      Product description
    </p>
  );
};

const useScreenWidth = (width) => {
  const [w, setW] = useState(null);
};

export default Details;
