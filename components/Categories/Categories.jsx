import CategoriesCategory from './CategoriesCategory';

const Categories = ({ categories }) => (
  <div className='categories'>
    {categories.map((category) => (
      <CategoriesCategory key={category.name} category={category} />
    ))}
  </div>
);

export default Categories;
