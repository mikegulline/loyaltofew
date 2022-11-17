import CategoryItems from './CategoryItems';

const Category = ({ category }) => {
  const buildCategoryItems = category.products.map((product) => (
    <CategoryItems key={product.name} product={product} />
  ));

  return <div className='category'>{buildCategoryItems}</div>;
};

export default Category;
