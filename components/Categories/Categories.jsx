import CategoriesCategory from './CategoriesCategory';

const Categories = ({ categories }) => {
  const buildCategories = () =>
    categories.map((category) => (
      <CategoriesCategory key={category.name} category={category} />
    ));

  return <div className='categories'>{buildCategories()}</div>;
};

export default Categories;
