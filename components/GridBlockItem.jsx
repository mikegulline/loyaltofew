import Image from 'next/image';
import Link from 'next/link';

const GridBlockItem = ({ link, image, name, children }) => {
  return (
    <div className='relative text-center'>
      <Link href={link}>
        <Image
          src={image}
          alt={name}
          className='block h-auto w-full bg-zinc-200 p-8 xl:p-16'
          width={310}
          height={310}
        />
        <h4 className='mt-4 text-lg font-black'>{name}</h4>
      </Link>
      {children}
    </div>
  );
};

export default GridBlockItem;
