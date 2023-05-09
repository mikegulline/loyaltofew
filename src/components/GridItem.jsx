import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const GridItem = ({ product, scroll = true, index, children }) => {
  const { link, image, imageBlur = null, name } = product;
  const [loading, setLoading] = useState(true);
  const hasImageBlur = {
    placeholder: 'blur',
    blurDataURL: imageBlur,
  };
  return (
    <div className='relative pb-6 text-center'>
      <div className='overflow-hidden rounded bg-zinc-200'>
        <style>{`.delay-${index} {transition-delay: ${
          (index + 1) * 75
        }ms}`}</style>
        <Link
          href={link}
          scroll={false}
          prefetch={false}
          onClick={() => window.scrollTo(0, 105)}
        >
          <Image
            src={image}
            alt={name}
            onLoadingComplete={(e) => setLoading(false)}
            className={`${
              loading
                ? 'scale-110 opacity-0'
                : `scale-100 opacity-100 transition-all duration-300 delay-${index}  ease-out`
            } block h-auto w-full border-0 outline-none `}
            width={310}
            height={310}
            {...(imageBlur ? hasImageBlur : null)}
          />
        </Link>
      </div>
      {children}
    </div>
  );
};

export default GridItem;
