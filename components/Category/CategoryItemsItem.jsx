import Link from 'next/link';
import Image from 'next/image';
import ColorLinks from '../ColorLinks';
import { isPlurl } from '../../utils/plurl';
import styles from './CategoryItemsItem.module.css';

const CategoryItemsItem = ({ logo, product }) => {
  const { link: checkLink, image, name } = logo;
  const { colors } = product;
  const link = `${checkLink}/${colors[0].toLowerCase()}`;

  return (
    <div className={styles.item}>
      <Link href={link}>
        <Image
          src={image}
          alt={name}
          className={styles.image}
          width={100}
          height={100}
        />
        <h4 className={styles.title}>{name}</h4>
      </Link>
      <ColorLinks colors={colors} link={link} />
    </div>
  );
};

export default CategoryItemsItem;
