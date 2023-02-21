import Image from 'next/image';
import Link from './Link';

const GridBlockItem = (props) => {
  const { link, image, name, children, h4 } = props;
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
        <h4 className='mt-4 mb-2 font-medium'>{h4}</h4>
        {/* {showName && <h4 className='mt-4 mb-2 font-medium'>{name}</h4>} */}
      </Link>
      {children}
    </div>
  );
};

export default GridBlockItem;
