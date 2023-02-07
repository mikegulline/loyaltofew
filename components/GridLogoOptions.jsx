import GridBlock from './GridBlock';
import GridBlockItem from './GridBlockItem';
import GridBlockItemSelectDot from './GridBlockItemSelectDot';

const GridLogoOptions = ({ product }) => {
  const { logos, color } = product;

  const buildLogoOptions = logos.map((logo) => {
    const { link, name, imageColorRoot } = logo;
    const current = product.logo === logo.logo;

    return (
      <GridBlockItem
        key={name}
        link={`${link}/${color.toLowerCase()}`}
        scroll='focus'
        image={`${imageColorRoot}${color}.jpg`}
        name={name}
        showName={false}
        shallow={false}
      >
        <GridBlockItemSelectDot current={current} />
      </GridBlockItem>
    );
  });

  return <GridBlock name='Logo Options'>{buildLogoOptions}</GridBlock>;
};

export default GridLogoOptions;
