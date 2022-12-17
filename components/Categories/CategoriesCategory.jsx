import CategoriesCategoryItem from './CategoriesCategoryItem';
import GridBlock from '../GridBlock';
import ViewAll from './ViewAll';

const CategoriesCategory = ({ category }) => {
  const { name, products, link } = category;

  const buildCategoryItems = products.map((product) => (
    <CategoriesCategoryItem key={product.name} product={product} />
  ));

  return (
    <GridBlock name={name}>
      {buildCategoryItems}
      <ViewAll href={link} name={name} />
    </GridBlock>
  );
};

export default CategoriesCategory;
