import { useState, useEffect } from 'react';
import { SlRefresh } from 'react-icons/sl';
import Image from 'next/image';
import styles from './HeroImage.module.css';
import Irl from './Irl';

const HeroImage = ({ product }) => {
  const {
    image,
    color,
    colors,
    link,
    imageBlur,
    name,
    imageBack,
    has_image_back,
    irl,
  } = product;
  const [irlImage, setIrlImage] = useState(image);

  const [showBack, setShowBack] = useState(false);
  const [animate, setAnimate] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let animateId = setTimeout(() => setAnimate(0), 650);

    return () => clearTimeout(animateId);
  }, [showBack]);

  const wrapColorLinksProps = {
    color,
    colors,
    link,
  };
  const toggleViewProps = {
    showBack,
    setShowBack,
    setAnimate,
  };
  let imageThumbs;
  if (has_image_back) {
    imageThumbs = [
      { image, imageBlur },
      { image: imageBack, imageBlur: null },
      ...irl,
    ];
  } else {
    imageThumbs = [{ image, imageBlur }, ...irl];
  }
  return (
    <div className='relative lg:pr-28 lg:pb-0'>
      <div id='hero-image' className='image-wrapper relative'>
        <div className='relative overflow-hidden rounded bg-[#e5e5e7]'>
          {loading && <Spinner />}
          <div
            className={
              loading
                ? 'scale-110 opacity-0'
                : 'scale-100 opacity-100 transition-all duration-300 ease-out'
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
          </div>
        </div>

        <div
          className={`${
            !loading ? 'absolute  bg-[#e5e5e7]' : 'absolute '
          } top-0 h-full w-full overflow-hidden rounded `}
        >
          {imageThumbs?.map(({ image, imageBlur }, i) => {
            return (
              <Image
                key={`main ${name} ${i}`}
                src={image}
                alt={`${name} ${i}`}
                width='744'
                height='744'
                // placeholder='blur'
                // blurDataURL={imageBlur}
                className={`${
                  image === irlImage
                    ? 'block scale-100 opacity-100'
                    : 'scale-90 opacity-0'
                }  absolute transition-all duration-500`}
              />
            );
          })}
        </div>
      </div>
      <Irl
        images={imageThumbs}
        name={name}
        current={irlImage}
        handleSetImage={setIrlImage}
      />
    </div>
  );
};
///
const Spinner = () => {
  return (
    <div className=' absolute top-0 left-0 flex h-full w-full items-center justify-center'>
      <div className='relative h-10 w-10'>
        <div className='absolute h-2 w-10 animate-spin'>
          <div className=' mr-0 ml-auto h-2 w-2 rounded-full bg-white' />
        </div>
        <div className='absolute h-2 w-10 animate-spin'>
          <div className=' mr-auto ml-0 h-2 w-2 rounded-full bg-white' />
        </div>
      </div>
    </div>
  );
};

const ToggleView = ({ showBack, setShowBack, setAnimate }) => {
  return (
    <div
      className={`${styles.view_back_button}  shadow-lg ${
        showBack ? styles.hover : ''
      }`}
      onClick={() => {
        setShowBack(showBack > 0 ? 0 : 1);
        setAnimate(1);
      }}
    >
      <SlRefresh />
    </div>
  );
};

export default HeroImage;
