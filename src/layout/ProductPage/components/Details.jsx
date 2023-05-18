import { useState } from 'react';

const Details = ({ details, thisKey = '' }) => {
  return (
    <ul className='ml-3 mb-4 list-disc pl-3 text-gray-900 lg:mb-6'>
      {details.map((info, i) => (
        <li key={`${thisKey}-${i}`}>{info}</li>
      ))}
    </ul>
  );
};

export default Details;
