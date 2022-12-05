import Link from 'next/link';
import Image from 'next/image';
import styles from './LogoOptionsItem.module.css';

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
          width={310}
          height={310}
        />
      </Link>
    </div>
  );
};

export default CategoryItemsItem;
