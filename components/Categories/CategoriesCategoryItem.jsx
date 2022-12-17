import GridBlockItem from '../GridBlockItem';
import Link from 'next/link';
import { plural } from '../../utils/plural';

const CategoriesCategoryItem = ({ product }) => {
  const { link, image, name, logos, colors } = product;

  return (
    <GridBlockItem link={link} image={image} name={name}>
      <p>
        {plural(logos, ['Design', 'Designs'])},{' '}
        {plural(colors, ['Color', 'Colors'])}
      </p>
      <p>
        <Link href={link} className='text-red-700 underline hover:text-black'>
          View All
        </Link>
      </p>
    </GridBlockItem>
  );
};

export default CategoriesCategoryItem;
