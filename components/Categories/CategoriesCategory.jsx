import Link from 'next/link';
import CategoriesCategoryItem from './CategoriesCategoryItem';
import styles from './CategoriesCategory.module.css';

const CategoriesCategory = ({ category }) => {
  const { name, products, link } = category;

  const buildCategoryItems = products.map((product) => (
    <CategoriesCategoryItem key={product.name} product={product} />
  ));

  return (
    <div className={styles.category}>
      <div className={styles.header}>
        <h2>{name}</h2>
      </div>
      <div className={styles.products}>
        {buildCategoryItems}
        <div className={styles.viewAll}>
          <Link
            href={link}
            title='view all name'
            className={styles.viewAllButton}
          >
            View All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesCategory;
