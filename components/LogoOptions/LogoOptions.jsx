// import Image from 'next/image';
import LogoOptionsItem from './LogoOptionsItem';
import GridBlock from '../GridBlock';

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

  return <GridBlock name='Logo Options'>{buildLogoOptions}</GridBlock>;
};

export default LogoOptions;
