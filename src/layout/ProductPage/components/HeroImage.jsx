import { useState, useEffect } from 'react';
import { SlRefresh } from 'react-icons/sl';
import Image from 'next/image';
import styles from './HeroImage.module.css';

const HeroImage = ({ product }) => {
  const { image, imageBlur, name, imageBack, has_image_back } = product;
  const [showBack, setShowBack] = useState(false);
  const [animate, setAnimate] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let animateId = setTimeout(() => setAnimate(0), 650);

    return () => clearTimeout(animateId);
  }, [showBack]);

  if (!has_image_back) {
    return (
      <div className='image-wrapper  '>
        <div className='relative overflow-hidden rounded bg-[#e5e5e7]'>
          <Image
            src={image}
            alt={name}
            placeholder='blur'
            blurDataURL={imageBlur}
            onLoadingComplete={(e) => setLoading(false)}
            priority={true}
            width='744'
            height='744'
            className={`${
              loading
                ? 'scale-110 opacity-0 '
                : 'scale-100 opacity-100 transition-all duration-1000 ease-out'
            }max-width-100 block h-auto border-0 bg-[#e5e5e7] outline-none xl:max-w-[606px] 2xl:max-w-[734px]`}
          />
        </div>
      </div>
    );
  }

  const toggleViewProps = {
    showBack,
    setShowBack,
    setAnimate,
  };

  return (
    <div className='image-wrapper  '>
      <div className='relative overflow-hidden rounded bg-[#e5e5e7]'>
        <div
          className={
            loading
              ? 'scale-110 opacity-0 '
              : 'scale-100 opacity-100 transition-all duration-1000 ease-out'
          }
        >
          <Image
            src={image}
            alt={name}
            placeholder='blur'
            blurDataURL={imageBlur}
            priority={true}
            width='744'
            height='744'
            onLoadingComplete={(e) => setLoading(false)}
            className={`${showBack ? styles.image_off : styles.image_on} ${
              styles.image_front
            } ${
              animate ? styles.animate : ''
            } max-width-100 block h-auto border-0 bg-[#e5e5e7] outline-none xl:max-w-[606px] 2xl:max-w-[734px]`}
          />
          <Image
            src={imageBack}
            alt={name}
            width='744'
            height='744'
            className={`${showBack ? styles.image_on : styles.image_off} ${
              animate ? styles.animate : ''
            } max-width-100 block h-auto border-0 bg-[#e5e5e7] outline-none xl:max-w-[606px] 2xl:max-w-[734px]`}
          />
        </div>
        <ToggleView {...toggleViewProps} />
      </div>
    </div>
  );
};

const ToggleView = ({ showBack, setShowBack, setAnimate }) => {
  return (
    <div className={styles.wrapper_view_back_button}>
      <div
        className={`${styles.view_back_button} ${showBack ? styles.hover : ''}`}
        onClick={() => {
          setShowBack(showBack > 0 ? 0 : 1);
          setAnimate(1);
        }}
      >
        <SlRefresh />
      </div>
    </div>
  );
};

export default HeroImage;
