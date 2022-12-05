// import Image from 'next/image';
import LogoOptionsItem from './LogoOptionsItem';
import styles from './LogoOptions.module.css';

const LogoOptions = ({ product }) => {
  const { logos, color } = product;

  const buildLogoOptions = logos.map((logo) => (
    <LogoOptionsItem
      key={logo.name}
      logo={logo}
      product={product}
      color={color}
      current={product.logo === logo.logo}
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

export default LogoOptions;
