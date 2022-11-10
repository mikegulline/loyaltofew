import { useState } from 'react';
import styles from './ProductPage.module.css';
import Image from 'next/image';
import ColorLinks from '../ColorLinks';

const ProductPage = ({ product }) => {
  const [sizeAndPriceIndex, setSizeAndPriceIndex] = useState(0);
  const { name, image, link, colors, sizes, details } = product;
  return (
    <div className={styles.product}>
      <div>
        <div>
          <Image src={image} alt={name} width='450' height='450' />
        </div>
        <h3>{name}</h3>
        <ColorLinks colors={colors} link={link} />
        <Sizes sizes={sizes} onChange={setSizeAndPriceIndex} />
        <Dimensions dimensions={sizes[sizeAndPriceIndex].dimensions} />
      </div>
    </div>
  );
};

const Dimensions = ({ dimensions }) => {
  if (!dimensions) return <></>;
  return (
    <ul>
      {dimensions.split(', ').map((info) => (
        <li key={info}>{info}</li>
      ))}
    </ul>
  );
};

const Sizes = ({ sizes, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <p>
      <select name='size' onChange={handleChange}>
        {sizes.map(({ size, price, dimensions }, i) => (
          <option key={size} value={i}>
            {size} | ${price}
          </option>
        ))}
      </select>
    </p>
  );
};

export default ProductPage;
