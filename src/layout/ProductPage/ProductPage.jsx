import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SlRefresh } from 'react-icons/sl';
import ColorLinks from '@/components/ColorLinks';
import Container from '@/components/Container';
import SlideshowGridGallery from '@/components/SlideshowGridGallery';
import GridItem from '@/components/GridItem';
import GridItemSelectDot from '@/components/GridItemSelectDot';
import styles from './ProductPage.module.css';

const ProductPage = ({ product }) => {
  const [sizeAndPriceIndex, setSizeAndPriceIndex] = useState(0);
  const [colorsState, setColorsState] = useState(() =>
    product.sizes?.colors ? product.sizes.colors : product.colors
  );
  const {
    id,
    name,
    image,
    imageBlur = null,
    imageBack,
    has_image_back,
    link,
    colors,
    sizes,
    weight,
    details,
    color,
    logos,
    name_root,
  } = product;

  const galleryArray = logos.map((logo) => {
    const { link, image, imageBlur, logo: logoName } = logo;
    const current = product.logo === logo.logo;
    const name = `${name_root} with ${logoName} Design (${color})`;
    const buildProduct = {
      link,
      image,
      imageBlur,
      name,
    };
    return (
      <GridItem key={name} product={buildProduct} scroll={false}>
        <GridItemSelectDot current={current} />
        <h4 className='mt-2 font-medium'>{`${logoName} Design`}</h4>
      </GridItem>
    );
  });

  const showButtons = sizes.map((s, i) => {
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
          i != sizeAndPriceIndex ? 'hidden ' : ''
        } snipcart-add-item font-lighter rounded border border-gray-900 bg-gray-900 text-white hover:border-red-600 hover:bg-red-600`}
      >
        Add to cart
      </button>
    );
  });

  useEffect(() => {
    if (sizes.length - 1 < sizeAndPriceIndex) {
      setSizeAndPriceIndex(sizes.length - 1);
    }
  }, [sizes, sizeAndPriceIndex]);

  useEffect(() => {
    if (sizes[sizeAndPriceIndex]?.colors)
      setColorsState(sizes[sizeAndPriceIndex]?.colors);
    else setColorsState(colors);
  }, [sizeAndPriceIndex, sizes, colors]);

  return (
    <>
      <div className='wrapper pt-5 lg:pt-8  xl:pt-12 2xl:pt-16'>
        <Container className='flex flex-col items-center xl:flex-row'>
          <HeroImage
            image={image}
            imageBlur={imageBlur}
            name={name}
            imageBack={imageBack}
            has_image_back={has_image_back}
          />

          <div className='info-column mt-8 w-full px-0 xl:mt-0 xl:px-20 2xl:px-28'>
            <h1 className='mb-6 text-4xl font-black text-gray-900'>
              {name} ({color})
            </h1>

            <Dimensions dimensions={sizes[sizeAndPriceIndex]?.dimensions} />
            <Details details={details} />
            {colorsState.length > 1 && (
              <>
                <p className='mb-2 font-bold'>Color Options</p>
                <ColorLinks
                  colors={colorsState}
                  link={link}
                  align='left'
                  scroll={false}
                  className='mb-6'
                />
              </>
            )}
            <p className='mb-2 font-bold'>Size Options</p>
            <div className='buttons flex gap-1'>
              <Sizes
                sizes={sizes}
                onChange={setSizeAndPriceIndex}
                current={sizeAndPriceIndex}
                color={color}
              />
              {showButtons}
            </div>
          </div>
        </Container>
        {galleryArray.length > 1 ? (
          <Container className='pt-8'>
            <SlideshowGridGallery title='Logo Options'>
              {galleryArray}
            </SlideshowGridGallery>
          </Container>
        ) : null}
      </div>
    </>
  );
};

const HeroImage = ({ image, imageBlur, name, imageBack, has_image_back }) => {
  const [showBack, setShowBack] = useState(false);
  const [animate, setAnimate] = useState(0);

  useEffect(() => {
    let animateId = setTimeout(() => setAnimate(0), 650);

    return () => clearTimeout(animateId);
  }, [showBack]);

  if (has_image_back) {
    return (
      <div className='image-column'>
        <div className='image-wrapper relative rounded bg-[#e5e5e7]'>
          <Image
            src={image}
            alt={name}
            placeholder='blur'
            blurDataURL={imageBlur}
            priority={true}
            width='744'
            height='744'
            className={`${showBack ? styles.image_off : styles.image_on} ${
              styles.image_front
            } ${
              animate ? styles.animate : ''
            } max-width-100 block h-auto p-4 lg:p-12 xl:max-w-[606px] 2xl:max-w-[734px]`}
          />
          <Image
            src={imageBack}
            alt={name}
            width='744'
            height='744'
            className={`${showBack ? styles.image_on : styles.image_off} ${
              animate ? styles.animate : ''
            } max-width-100 block h-auto p-4 lg:p-12 xl:max-w-[606px] 2xl:max-w-[734px]`}
          />
          <div className={styles.wrapper_view_back_button}>
            <div
              className={`${styles.view_back_button} ${
                showBack ? styles.hover : ''
              }`}
              onClick={() => {
                setShowBack(showBack > 0 ? 0 : 1);
                setAnimate(1);
              }}
            >
              <SlRefresh />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='image-column'>
      <div className='image-wrapper rounded bg-[#e5e5e7]'>
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

  return (
    <ul className='ml-3 mb-6 list-disc pl-3 text-gray-900'>{buildDetails}</ul>
  );
};

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

const Sizes = ({ sizes, onChange, color }) => {
  const handleSizeChange = (e) => {
    onChange(e.target.value);
  };

  const buildSizes = sizes
    .filter((obj) => {
      if (obj?.colors) {
        if (obj?.colors.includes(color)) return obj;
        else return;
      }
      return obj;
    })
    .map(({ size, price }, i) => (
      <option key={size} value={i}>
        {size} | ${price}
      </option>
    ));

  return (
    <select
      name='size'
      className='bg-gray-100 hover:border-red-600 hover:bg-white'
      onChange={handleSizeChange}
    >
      {buildSizes}
    </select>
  );
};

export default ProductPage;
