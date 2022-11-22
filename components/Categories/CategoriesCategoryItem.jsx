import Image from 'next/image';
import Link from 'next/link';
import { plural, isPlural } from '../../utils/plural';
import styles from './CategoriesCategoryItem.module.css';

const CategoriesCategoryItem = ({ product }) => {
  const { link, image, name, logos, colors } = product;
  // let link;
  // if (!isPlural(logos)) link = `${checkLink}/${logos[0].logo.toLowerCase()}`;
  // else link = checkLink;

  // link = `${checkLink}/${logos[0].logo.toLowerCase()}`;

  return (
    <div className={styles.item}>
      <Link href={link}>
        <Image
          src={image}
          alt={name}
          className={styles.image}
          width={150}
          height={150}
        />
        <h4 className={styles.title}>{name}</h4>
        <p>
          {plural(logos, ['Design', 'Designs'])},{' '}
          {plural(colors, ['Color', 'Colors'])}
        </p>
      </Link>
    </div>
  );
};

export default CategoriesCategoryItem;
