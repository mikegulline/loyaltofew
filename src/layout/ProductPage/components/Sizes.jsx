const Sizes = ({ product, handleChange }) => {
  const { sizes, color } = product;

  return (
    <select
      name='size'
      className='bg-gray-100 hover:border-red-600 hover:bg-white'
      onChange={(e) => handleChange(e.target.value)}
    >
      {sizes
        .filter((obj) => {
          // if a size has modified colors
          if (obj?.colors) {
            // show only show size for color selected
            if (obj?.colors.includes(color)) return obj;
            return;
          }
          return obj;
        })
        .map(({ size, price }, i) => (
          <option key={size} value={i}>
            {size} | ${price}
          </option>
        ))}
    </select>
  );
};

export default Sizes;
