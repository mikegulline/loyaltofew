import GridBlockItem from '../GridBlockItem';
import GridBlock from '../GridBlock';
import GridBlockItemSelectDot from '../GridBlockItemSelectDot';

const LogoOptions = ({ product }) => {
  const { logos, colors } = product;

  const buildLogoOptions = logos.map((logo) => {
    const { link, image, name } = logo;
    const current = product.logo === logo.logo;

    return (
      <GridBlockItem
        key={name}
        link={`${link}/${colors[0].toLowerCase()}`}
        image={image}
        name={name}
      >
        <GridBlockItemSelectDot current={current} />
      </GridBlockItem>
    );
  });

  return <GridBlock name='Logo Options'>{buildLogoOptions}</GridBlock>;
};

export default LogoOptions;
