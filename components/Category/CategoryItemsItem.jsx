import Link from 'next/link';
import Image from 'next/image';
import ColorLinks from '../ColorLinks';
import styles from './CategoryItemsItem.module.css';

const CategoryItemsItem = ({ logo, product }) => {
  const { link, image, name } = logo;

  const { colors } = product;

  const imageLink = `${link}/${colors[0].toLowerCase()}`;

  return (
    <div className={styles.item}>
      <Link href={imageLink}>
        <Image
          src={image}
          alt={name}
          className={styles.image}
          width={150}
          height={150}
        />
        <h4 className={styles.title}>{name}</h4>
      </Link>
      <ColorLinks colors={colors} link={link} />
    </div>
  );
};

export default CategoryItemsItem;
