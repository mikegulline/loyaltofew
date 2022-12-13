// import Image from 'next/image';
import Link from 'next/link';
import CategoryItemsItem from './CategoryItemsItem';
import styles from './CategoryItems.module.css';
import { isPlural } from '../../utils/plural';

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

  const addHeader = (
    <div className={styles.header}>
      <h2>{name}</h2>
    </div>
  );
  const addLogoOptionsHead = (
    <div className={styles.header}>
      <h2>{title}</h2>
    </div>
  );
  return (
    <div className={styles.category}>
      {title ? addLogoOptionsHead : addHeader}
      <div className={styles.products}>{buildCategoryItems}</div>
    </div>
  );
};

export default CategoryItems;
