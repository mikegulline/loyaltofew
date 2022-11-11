import Link from 'next/link';
import CategoriesCategoryItem from './CategoriesCategoryItem';
import styles from './CategoriesCategory.module.css';

const CategoriesCategory = ({ category }) => {
  const { name, link, products } = category;
  return (
    <div className={styles.category}>
      <h2 className={styles.header}>
        <Link href={link} width={100}>
          {name}
        </Link>
      </h2>
      <div className={styles.products}>
        {products.map((product) => (
          <CategoriesCategoryItem key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesCategory;
