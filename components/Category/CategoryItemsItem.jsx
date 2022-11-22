import Link from 'next/link';
import Image from 'next/image';
import ColorLinks from '../ColorLinks';
import styles from './CategoryItemsItem.module.css';

const CategoryItemsItem = ({ logo, product, color }) => {
  const { link, image, imageColorRoot, name } = logo;

  const { colors } = product;

  let imageLink, imageSrc;
  if (color) {
    imageLink = `${link}/${color.toLowerCase()}`;
    imageSrc = `${imageColorRoot}${color}.jpg`;
  } else {
    imageLink = `${link}/${colors[0].toLowerCase()}`;
    imageSrc = image;
  }

  return (
    <div className={styles.item}>
      <Link href={imageLink}>
        <Image
          src={imageSrc}
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
