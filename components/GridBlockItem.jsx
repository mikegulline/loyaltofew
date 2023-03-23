import Image from 'next/image';
import Link from './Link';

const GridBlockItem = ({ product: { link, image, name }, children }) => (
  <div className='relative pb-6 text-center'>
    <Link href={link}>
      <Image
        src={image}
        alt={name}
        className='block h-auto w-full rounded bg-zinc-200 p-4 xl:p-8'
        width={310}
        height={310}
      />
    </Link>
    {children}
  </div>
);

export default GridBlockItem;
