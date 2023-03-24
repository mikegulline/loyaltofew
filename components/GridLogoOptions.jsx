import GridBlock from './GridBlock';
import GridItem from './GridItem';
import GridItemSelectDot from './GridItemSelectDot';

const GridLogoOptions = ({ product }) => {
  const { logos, color } = product;

  if (logos.length === 1) return <></>;

  const buildLogoOptions = logos.map((logo) => {
    const { link, name, imageColorRoot, logo: logoName } = logo;
    const current = product.logo === logo.logo;

    return (
      <GridItem
        key={name}
        link={`${link}/${color.toLowerCase()}`}
        image={`${imageColorRoot}${color}.jpg`}
        name={name}
        showName={false}
      >
        <GridItemSelectDot current={current} />
        <h4 className='mt-2 font-medium'>{`${logoName} Design`}</h4>
      </GridItem>
    );
  });

  return <GridBlock name='Logo Options'>{buildLogoOptions}</GridBlock>;
};

export default GridLogoOptions;
