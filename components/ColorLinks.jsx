import Link from 'next/link';
import styles from '../styles/colors.module.css';

const ColorLinks = ({ colors, link, align = '', scroll = true }) => {
  const wrapperClass = styles[`colorSwatches${align}`];

  const buildLinks = colors.map((color) => {
    const linkClasses = `${styles.colorSwatch} ${
      styles[color.toLowerCase().replace(' ', '')]
    }`;
    const href = `${link}/${color.toLowerCase().replace(' ', '')}`;

    return (
      <Link
        className={linkClasses}
        key={color}
        href={href}
        title={color}
        scroll={scroll}
      >
        <div className={styles.colorSwatchName}>{color}</div>
      </Link>
    );
  });

  return <div className={wrapperClass}>{buildLinks}</div>;
};

export default ColorLinks;
