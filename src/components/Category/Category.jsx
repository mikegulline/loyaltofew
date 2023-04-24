import GridItem from '@/components/GridItem';
import SlideshowGridGallery from '@/components/SlideshowGridGallery';
import ColorLinks from '@/components/ColorLinks';

const Category = ({ products }) =>
  products.map(({ name, logos, colors }) => (
    <SlideshowGridGallery key={name} title={name}>
      {logos.map((logo) => (
        <GridItem key={logo.name} product={{ ...logo, link: logo.linkColor }}>
          <h4 className='mt-2 mb-2 font-medium'>{`${logo.logo} Design`}</h4>
          <ColorLinks colors={colors} link={logo.link} scroll={true} />
        </GridItem>
      ))}
    </SlideshowGridGallery>
  ));

export default Category;