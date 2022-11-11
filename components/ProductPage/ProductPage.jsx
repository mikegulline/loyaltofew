import { useState, Fragment } from 'react';
import styles from './ProductPage.module.css';
import Image from 'next/image';
import ColorLinks from '../ColorLinks';

const ProductPage = ({ product }) => {
  const [sizeAndPriceIndex, setSizeAndPriceIndex] = useState(0);
  const { name, image, link, colors, sizes, details } = product;
  return (
    <div className={styles.product}>
      <div className={styles.imageBlock}>
        <Image src={image} alt={name} width='650' height='650' />
      </div>
      <div className={styles.infosBlock}>
        <h3>LTF: {name}</h3>
        <ColorLinks colors={colors} link={link} align='left' />
        <Sizes sizes={sizes} onChange={setSizeAndPriceIndex} />
        <Dimensions dimensions={sizes[sizeAndPriceIndex].dimensions} />
        <Details details={details} />
        <button disabled>Buy Now</button>
      </div>
    </div>
  );
};

const Details = ({ details }) => {
  return (
    <p>
      {details.map((info, i) => (
        <Fragment key={i}>
          {i > 0 ? ' ' : ''}
          {info}.
        </Fragment>
      ))}
    </p>
  );
};

const Dimensions = ({ dimensions }) => {
  if (!dimensions) return <></>;
  return (
    <>
      <p>
        <strong>Dimensions:</strong>
      </p>
      <ul>
        {dimensions.split(', ').map((info) => (
          <li key={info}>{info}</li>
        ))}
      </ul>
    </>
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
