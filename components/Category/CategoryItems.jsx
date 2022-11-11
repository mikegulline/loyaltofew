// import Image from 'next/image';
import Link from 'next/link';
import CategoryItemsItem from './CategoryItemsItem';
import styles from './CategoryItems.module.css';
import { isPlural } from '../../utils/plural';

const CategoryItems = ({ product }) => {
  const { name, link, logos } = product;
  const titleLink = isPlural(logos)
    ? link
    : `${link}/${logos[0].logo.toLowerCase()}`;
  return (
    <div className={styles.category}>
      <h2 className={styles.header}>
        <Link href={titleLink} width={100}>
          {name}
        </Link>
      </h2>
      <div className={styles.products}>
        {logos.map((logo) => (
          <CategoryItemsItem key={logo.name} logo={logo} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryItems;
