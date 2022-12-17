import Image from 'next/image';
import Link from 'next/link';
import { plural } from '../../utils/plural';

const CategoriesCategoryItem = ({ product }) => {
  const { link, image, name, logos, colors } = product;

  return (
    <div className='relative'>
      <Link href={link}>
        <Image
          src={image}
          alt={name}
          className='block h-auto w-full bg-zinc-200 p-6 xl:p-12 2xl:p-24'
          width={150}
          height={150}
        />
        <h4 className='mt-4 text-lg font-black'>{name}</h4>
        <p>
          {plural(logos, ['Design', 'Designs'])},{' '}
          {plural(colors, ['Color', 'Colors'])}
        </p>
        <p>
          <Link href={link} className='text-red-700 underline hover:text-black'>
            View All
          </Link>
        </p>
      </Link>
    </div>
  );
};

export default CategoriesCategoryItem;
