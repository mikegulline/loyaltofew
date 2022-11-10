import CategoryItems from './CategoryItems';

const Category = ({ category }) => loopCategoryItems(category);

const loopCategoryItems = (category) => {
  return (
    <div className='category'>
      {category.products.map((product) => (
        <CategoryItems key={product.name} product={product} />
      ))}
    </div>
  );
};

export default Category;
