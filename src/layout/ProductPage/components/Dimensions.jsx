import { useState } from 'react';

const Dimensions = ({ sizesArray }) => {
  const [open, setOpen] = useState(false);

  if (!sizesArray[0]?.dimensions) return null;
  if (!open)
    return (
      <p
        className='mb-6 cursor-pointer text-red-600 underline'
        onClick={() => setOpen(true)}
      >
        Size Chart
      </p>
    );
  return (
    <>
      <p className='mb-6 cursor-pointer text-red-600 underline'>Size Chart</p>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-100'>
        <div className=''>
          <div className='flex justify-end'>
            <p
              onClick={() => setOpen(false)}
              className='cursor-pointer p-3 text-red-600 underline'
            >
              Close
            </p>
          </div>
          <div className='overflow-hidden rounded border border-gray-300 bg-white shadow-xl'>
            <table className='w-full table-auto'>
              <thead className=' bg-gray-100'>
                <tr>
                  {['Size', ...sizesArray[0]?.dimensions.split(', ')]?.map(
                    (info) => {
                      const [index, value] = info.split(': ');
                      return (
                        <th
                          key={`tk-${index}`}
                          className='px-3 py-2 text-center text-sm'
                        >
                          {index}
                        </th>
                      );
                    }
                  )}
                </tr>
              </thead>
              <tbody>
                {sizesArray.map(({ size, dimensions }) => {
                  const tableRow = [size];
                  dimensions.split(', ').map((info) => {
                    const [index, value] = info.split(': ');
                    tableRow.push(value);
                  });
                  return (
                    <tr
                      key={size}
                      className='border-t border-gray-200 text-sm hover:bg-gray-100/40 md:text-base'
                    >
                      {tableRow.map((info, i) => (
                        <td
                          key={info + i}
                          className='cursor-pointer px-3 py-2 text-center '
                        >
                          {info}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dimensions;
