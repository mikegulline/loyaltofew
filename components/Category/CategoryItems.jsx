// import Image from 'next/image';
import Link from 'next/link';
import CategoryItemsItem from './CategoryItemsItem';
import styles from './CategoryItems.module.css';

const CategoryItems = ({ product }) => {
  const { name, link, logos } = product;
  return (
    <div className={styles.category}>
      <h3 className={styles.header}>
        <Link href={link} width={100}>
          {name}
        </Link>
      </h3>
      <div className={styles.products}>
        {logos.map((logo) => (
          <CategoryItemsItem key={logo.name} logo={logo} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryItems;
