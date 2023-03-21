import GridBlock from '../GridBlock';
import GridBlockItem from '../GridBlockItem';

const CategoriesCategory = ({ category }) => {
  const { name, products, link } = category;

  const buildCategoryItems = products.map((product) => {
    const { link, image, name, logos, colors } = product;
    return (
      <GridBlockItem key={name} link={link} image={image} name={name}>
        <h4 className='mt-2 font-medium '>{name}</h4>
      </GridBlockItem>
    );
  });

  return (
    <GridBlock name={name} className='mb-16 xl:mb-24 '>
      {buildCategoryItems}
    </GridBlock>
  );
};

export default CategoriesCategory;
