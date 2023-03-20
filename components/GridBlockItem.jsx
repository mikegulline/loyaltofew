import Image from 'next/image';
import Link from './Link';

const GridBlockItem = (props) => {
  const { link, image, name, children, scroll = true } = props;
  return (
    <div className='relative pb-6 text-center'>
      <Link href={link} scroll={scroll}>
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
};

export default GridBlockItem;
