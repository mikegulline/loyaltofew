import Link from 'next/link';
import CategoriesCategoryItem from './CategoriesCategoryItem';
import styles from './CategoriesCategory.module.css';

const CategoriesCategory = ({ category }) => {
  const { name, link, products } = category;

  const buildCategoryItems = products.map((product) => (
    <CategoriesCategoryItem key={product.name} product={product} />
  ));

  return (
    <div className={styles.category}>
      <div className={styles.header}>
        <h2>{name}</h2>
        <Link href={link}>View All</Link>
      </div>
      <div className={styles.products}>{buildCategoryItems}</div>
    </div>
  );
};

export default CategoriesCategory;
