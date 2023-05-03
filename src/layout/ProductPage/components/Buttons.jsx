const Buttons = ({ product, index }) => {
  const { sizes, id, name, color, link, weight, image } = product;
  return sizes.map((s, i) => {
    return (
      <button
        key={i}
        data-item-id={`${id}:${s.size.toLowerCase().split(' ').join('-')}`}
        data-item-price={s.price}
        data-item-description={`${name} (${color}) ${s.size}`}
        data-item-image={image}
        data-item-name={`${name} (${color}) ${s.size}`}
        data-item-url={`${link}/${color.toLowerCase()}`}
        data-item-weight={weight}
        className={`${
          i != index ? 'hidden ' : ''
        } snipcart-add-item font-lighter rounded border border-gray-900 bg-gray-900 text-white hover:border-red-600 hover:bg-red-600`}
      >
        Add to cart
      </button>
    );
  });
};

export default Buttons;
