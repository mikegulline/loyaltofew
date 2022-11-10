import Image from 'next/image';
import Link from 'next/link';
import { plurl, isPlurl } from '../../utils/plurl';
import styles from './CategoriesCategoryItem.module.css';

const CategoriesCategoryItem = ({ product }) => {
  const { link: checkLink, image, name, logos, colors } = product;
  let link;
  if (!isPlurl(logos)) link = `${checkLink}/${logos[0].logo.toLowerCase()}`;
  else link = checkLink;
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
        <p>
          {plurl(logos, ['Design', 'Designs'])},{' '}
          {plurl(colors, ['Color', 'Colors'])}
        </p>
      </Link>
    </div>
  );
};

export default CategoriesCategoryItem;
