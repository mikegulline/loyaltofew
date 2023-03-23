import GridBlockItem from '../GridBlockItem';
import SlideshowGridGallery from '../SlideshowGridGallery';
import ColorLinks from '../ColorLinks';

const Category = ({ products }) =>
  products.map(({ name, logos, colors }) => (
    <SlideshowGridGallery key={name} title={name}>
      {logos.map((logo) => (
        <GridBlockItem key={logo.name} product={logo}>
          <h4 className='mt-2 mb-2 font-medium'>{`${logo.logo} Design`}</h4>
          <ColorLinks colors={colors} link={logo.link} scroll={true} />
        </GridBlockItem>
      ))}
    </SlideshowGridGallery>
  ));

export default Category;
