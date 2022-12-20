import GridBlock from './GridBlock';
import GridBlockItem from './GridBlockItem';
import GridBlockItemSelectDot from './GridBlockItemSelectDot';

const LogoOptions = ({ product }) => {
  const { logos, color } = product;

  const buildLogoOptions = logos.map((logo) => {
    const { link, name, imageColorRoot } = logo;
    const current = product.logo === logo.logo;

    return (
      <GridBlockItem
        key={name}
        link={`${link}/${color.toLowerCase()}`}
        image={`${imageColorRoot}${color}.jpg`}
        name={name}
      >
        <GridBlockItemSelectDot current={current} />
      </GridBlockItem>
    );
  });

  return <GridBlock name='Logo Options'>{buildLogoOptions}</GridBlock>;
};

export default LogoOptions;
