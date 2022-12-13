import { useState, Fragment } from 'react';
import styles from './ProductPage.module.css';
import Image from 'next/image';
import ColorLinks from '../../components/ColorLinks';
import Container from '../../components/Container/Container';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import LogoOptions from '../../components/LogoOptions/LogoOptions';

const ProductPage = ({ product }) => {
  const [sizeAndPriceIndex, setSizeAndPriceIndex] = useState(0);
  const { id, name, image, link, colors, sizes, details, color, breadcrumbs } =
    product;
  const productId = `${id}:${sizes[sizeAndPriceIndex].size}`;
  return (
    <>
      <Breadcrumbs links={breadcrumbs} />

      <div className={styles.wrapper}>
        <Container className={styles.product}>
          <div className={styles.imageBlock}>
            <Image src={image} alt={name} width='752' height='752' />
          </div>
          <div className={styles.infosBlock}>
            <h1>
              {name} ({color})
            </h1>
            <ColorLinks
              colors={colors}
              link={link}
              align='left'
              scroll={false}
            />

            <Dimensions dimensions={sizes[sizeAndPriceIndex].dimensions} />
            <Details details={details} />
            <div className={styles.buttons}>
              <Sizes sizes={sizes} onChange={setSizeAndPriceIndex} />
              <button
                className={`snipcart-add-item ${styles.button}`}
                data-item-id={productId}
                data-item-price={sizes[sizeAndPriceIndex].price}
                data-item-description={`${name} (${color}) ${sizes[sizeAndPriceIndex].size}`}
                data-item-image={image}
                data-item-name={`${name} (${color}) ${sizes[sizeAndPriceIndex].size}`}
                data-item-url={link}
              >
                Add to cart
              </button>
            </div>
          </div>
        </Container>
        <Container className={styles.logoOptions}>
          <LogoOptions product={product} />
        </Container>
      </div>
    </>
  );
};

const Details = ({ details }) => {
  const buildDetails = details.map((info, i) => {
    const space = i > 0 ? ' ' : '';
    return (
      <Fragment key={i}>
        {space}
        {info}.
      </Fragment>
    );
  });

  return <p>{buildDetails}</p>;
};

const Dimensions = ({ dimensions }) => {
  if (!dimensions) return <></>;

  const buildDimensions = dimensions
    .split(', ')
    .map((info) => <li key={info}>{info}</li>);

  return (
    <>
      <p>
        <strong>Dimensions:</strong>
      </p>
      <ul>{buildDimensions}</ul>
    </>
  );
};

const Sizes = ({ sizes, onChange }) => {
  const handleSizeChange = (e) => {
    onChange(e.target.value);
  };

  const buildSizes = sizes.map(({ size, price, dimensions }, i) => (
    <option key={size} value={i}>
      {size} | ${price}
    </option>
  ));

  return (
    <select name='size' onChange={handleSizeChange}>
      {buildSizes}
    </select>
  );
};

export default ProductPage;
