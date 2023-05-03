const Details = ({ details, thisKey = '' }) => {
  const buildDetails = details.map((info, i) => (
    <li key={`${thisKey}-${i}`}>{info}</li>
  ));

  return (
    <ul className='ml-3 mb-6 list-disc pl-3 text-gray-900'>{buildDetails}</ul>
  );
};

export default Details;
