const Dimensions = ({ dimensions }) => {
  if (!dimensions) return <></>;

  const buildDimensions = dimensions
    .split(', ')
    .map((info) => <li key={info}>{info}</li>);

  return (
    <div className='hidden'>
      <p className='mb-1 font-bold'>Dimensions:</p>
      <ul className='ml-4 mb-6 list-disc pl-4'>{buildDimensions}</ul>
    </div>
  );
};

export default Dimensions;
