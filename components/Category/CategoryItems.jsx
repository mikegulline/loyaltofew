import CategoryItemsItem from './CategoryItemsItem';
import GridBlock from '../GridBlock';

const CategoryItems = ({ product, title, color }) => {
  const { name, logos } = product;

  const buildCategoryItems = logos.map((logo) => (
    <CategoryItemsItem
      key={logo.name}
      logo={logo}
      product={product}
      color={color}
    />
  ));

  return (
    <GridBlock name={title ? title : name}>{buildCategoryItems}</GridBlock>
  );
};

export default CategoryItems;
