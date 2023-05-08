import GridItem from '@/components/GridItem';
import SlideshowGridGallery from '@/components/SlideshowGridGallery';
import ColorLinks from '@/components/ColorLinks';

const Category = ({ products }) => {
  let gridIndex = 0;
  return products.map(({ name, logos, link, colors }) => (
    <SlideshowGridGallery key={link} title={name} link={link}>
      {logos.map((logo, i) => {
        gridIndex++;
        return (
          <GridItem
            key={logo.logo}
            product={{
              ...logo,
              name: logo.logo,
              link: `${logo.link}/${colors[0]}`.toLocaleLowerCase(),
            }}
            index={gridIndex}
          >
            <h4 className='mt-2 mb-2 font-medium'>{`${logo.logo} Design`}</h4>
            <ColorLinks colors={colors} link={logo.link} scroll={true} small />
          </GridItem>
        );
      })}
    </SlideshowGridGallery>
  ));
};

export default Category;
