import Image from 'next/image';
import Link from '@/components/Link';

const GridItem = ({
  product: { link, image, imageBlur = null, name },
  scroll = true,
  children,
}) => (
  <div className='relative pb-6 text-center'>
    <Link href={link} scroll={scroll}>
      {imageBlur ? (
        <Image
          src={image}
          alt={name}
          placeholder='blur'
          blurDataURL={imageBlur}
          className='block h-auto w-full rounded bg-zinc-200 p-4 xl:p-8'
          width={310}
          height={310}
        />
      ) : (
        <Image
          src={image}
          alt={name}
          className='block h-auto w-full rounded bg-zinc-200 p-4 xl:p-8'
          width={310}
          height={310}
        />
      )}
    </Link>
    {children}
  </div>
);

export default GridItem;
