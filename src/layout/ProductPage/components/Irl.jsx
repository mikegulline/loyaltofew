import Image from 'next/image';

export default function Irl({ images, handleSetImage, name, current }) {
  return (
    <div className='absolute bottom-0 flex h-24 justify-center gap-4 lg:top-0 lg:bottom-auto lg:right-0 lg:h-full lg:w-24 lg:flex-col lg:pb-0'>
      {images.map(({ image, imageBlur }, i) => {
        return (
          <Image
            onClick={() => handleSetImage(current === image ? null : image)}
            key={image}
            src={image}
            placeholder='blur'
            blurDataURL={imageBlur}
            priority={true}
            width='100'
            height='100'
            className={`${
              current === image
                ? ' scale-90 opacity-40'
                : ' outline-transparent'
            } cursor-pointer overflow-hidden rounded transition-all duration-500`}
            alt={`${name} ${i}`}
          />
        );
      })}
    </div>
  );
}
