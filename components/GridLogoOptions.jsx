import GridBlock from './GridBlock';
import GridBlockItem from './GridBlockItem';
import GridBlockItemSelectDot from './GridBlockItemSelectDot';

const GridLogoOptions = ({ product }) => {
  const { logos, color } = product;

  const buildLogoOptions = logos.map((logo) => {
    const { link, name, imageColorRoot, logo: logoName } = logo;
    const current = product.logo === logo.logo;

    return (
      <GridBlockItem
        key={name}
        link={`${link}/${color.toLowerCase()}`}
        image={`${imageColorRoot}${color}.jpg`}
        name={name}
        showName={false}
      >
        <GridBlockItemSelectDot current={current} />
        <h4 className='mt-2 font-medium'>{`${logoName} Design`}</h4>
      </GridBlockItem>
    );
  });

  return <GridBlock name='Logo Options'>{buildLogoOptions}</GridBlock>;
};

export default GridLogoOptions;
