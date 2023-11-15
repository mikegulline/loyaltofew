import Image from 'next/image';

export default function Irl({ images, handleSetImage, name, current }) {
  return (
    <div className='bottom-0 mt-2 flex flex-wrap gap-2 lg:absolute lg:top-0 lg:bottom-auto lg:right-0 lg:mt-0 lg:h-full lg:w-24 lg:flex-col lg:justify-center lg:gap-4 lg:pb-0'>
      {images.map(({ image, imageBlur }, i) => {
        return (
          <Image
            onClick={() => handleSetImage(image)}
            key={image}
            src={image}
            // placeholder='blur'
            // blurDataURL={imageBlur}
            priority={true}
            width='100'
            height='100'
            className={`${
              current === image
                ? ' scale-90 opacity-40'
                : ' cursor-pointer outline-transparent'
            } overflow-hidden rounded transition-all duration-500`}
            alt={`${name} ${i}`}
          />
        );
      })}
    </div>
  );
}
