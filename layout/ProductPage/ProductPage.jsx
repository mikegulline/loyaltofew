import { useState, useEffect, Fragment } from 'react';
import Image from 'next/image';
import ColorLinks from '../../components/ColorLinks';
import Container from '../../components/Container';
import GridLogoOptions from '../../components/GridLogoOptions';

const ProductPage = ({ product, size }) => {
  const [sizeAndPriceIndex, setSizeAndPriceIndex] = useState(0);
  const { id, name, image, link, colors, sizes, weight, details, color } =
    product;

  const showButtons = sizes.map((s, i) => {
    return (
      <button
        key={i}
        data-item-id={`${id}:${s.size.toLowerCase()}`}
        data-item-price={s.price}
        data-item-description={`${name} (${color}) ${s.size}`}
        data-item-image={image}
        data-item-name={`${name} (${color}) ${s.size}`}
        data-item-url={`${link}/${color.toLowerCase()}`}
        data-item-weight={weight}
        className={`${
          i != sizeAndPriceIndex ? 'hidden ' : ''
        } snipcart-add-item font-lighter rounded border border-zinc-800 bg-zinc-800 text-white hover:border-red-600 hover:bg-red-600`}
      >
        Add to cart
      </button>
    );
  });

  useEffect(() => {
    setSizeAndPriceIndex(size);
  }, [size]);

  return (
    <>
      <div className='wrapper py-5 lg:py-8  xl:py-12 2xl:py-16'>
        <Container className='flex flex-col items-center xl:flex-row'>
          <HeroImage image={image} name={name} />

          <div className='info-column mt-8 w-full px-0 xl:mt-0 xl:px-20 2xl:px-28'>
            <h1 className='mb-8 text-4xl font-black'>
              {name} ({color})
            </h1>
            <ColorLinks
              colors={colors}
              link={link}
              align='left'
              scroll={false}
              className='mb-8'
            />

            <Dimensions dimensions={sizes[sizeAndPriceIndex].dimensions} />
            <Details details={details} />
            <div className='buttons flex gap-1'>
              <Sizes
                sizes={sizes}
                onChange={setSizeAndPriceIndex}
                current={sizeAndPriceIndex}
              />
              {showButtons}
            </div>
          </div>
        </Container>
        <Container className='pt-8'>
          <GridLogoOptions product={product} />
        </Container>
      </div>
    </>
  );
};

const HeroImage = ({ image, name }) => {
  return (
    <div className='image-column'>
      <div className='image-wrapper bg-zinc-200'>
        <Image
          src={image}
          alt={name}
          width='744'
          height='744'
          className='max-width-100 block h-auto p-4 lg:p-12 xl:max-w-[606px] 2xl:max-w-[734px]'
        />
      </div>
    </div>
  );
};

const Details = ({ details }) => {
  const buildDetails = details.map((info, i) => <li key={i}>{info} </li>);

  return <ul className='ml-4 mb-8 list-disc pl-4'>{buildDetails}</ul>;
};

const Dimensions = ({ dimensions }) => {
  if (!dimensions) return <></>;

  const buildDimensions = dimensions
    .split(', ')
    .map((info) => <li key={info}>{info}</li>);

  return (
    <div className='hidden'>
      <p className='mb-1 font-bold'>Dimensions:</p>
      <ul className='ml-4 mb-4 list-disc pl-4'>{buildDimensions}</ul>
    </div>
  );
};

const Sizes = ({ sizes, onChange, current }) => {
  const handleSizeChange = (e) => {
    onChange(e.target.value);
  };

  const buildSizes = sizes.map(({ size, price }, i) => (
    <option key={size} value={i}>
      {size} | ${price}
    </option>
  ));

  return (
    <select
      name='size'
      className='bg-zinc-100 hover:border-red-600 hover:bg-white'
      onChange={handleSizeChange}
    >
      {buildSizes}
    </select>
  );
};

export default ProductPage;
