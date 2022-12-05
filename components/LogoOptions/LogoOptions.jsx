// import Image from 'next/image';
import LogoOptionsItem from './LogoOptionsItem';
import styles from './LogoOptions.module.css';

const CategoryItems = ({ product, color }) => {
  const { logos } = product;

  const buildLogoOptions = logos.map((logo) => (
    <LogoOptionsItem
      key={logo.name}
      logo={logo}
      product={product}
      color={color}
    />
  ));

  return (
    <div className={styles.category}>
      <div className={styles.header}>
        <h2>Logo Options</h2>
      </div>
      <div className={styles.products}>{buildLogoOptions}</div>
    </div>
  );
};

export default CategoryItems;
