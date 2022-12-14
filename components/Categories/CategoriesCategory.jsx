import GridBlock from '../GridBlock';
import GridBlockItem from '../GridBlockItem';
import ViewAll from './ViewAll';
import Link from '../Link';
import { plural } from '../../utils/plural';

const CategoriesCategory = ({ category }) => {
  const { name, products, link } = category;

  const buildCategoryItems = products.map((product) => {
    const { link, image, name, logos, colors } = product;
    return (
      <GridBlockItem key={name} link={link} image={image} name={name}>
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
  });

  return (
    <GridBlock name={name}>
      {buildCategoryItems}
      <ViewAll href={link} name={name} />
    </GridBlock>
  );
};

export default CategoriesCategory;
