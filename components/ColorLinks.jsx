import Link from 'next/link';
import colorStyles from '../styles/colors.module.css';

const ColorLinks = ({ colors, link }) => (
  <div className={colorStyles.colorSwatches}>
    {colors.map((color) => (
      <Link
        className={`${colorStyles.colorSwatch} ${
          colorStyles[color.toLowerCase().replace(' ', '')]
        }`}
        key={color}
        href={`${link}/${color.toLowerCase().replace(' ', '')}`}
        title={color}
      >
        <div className={colorStyles.colorSwatchName}>{color}</div>
      </Link>
    ))}
  </div>
);

export default ColorLinks;
