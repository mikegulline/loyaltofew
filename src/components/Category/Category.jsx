import GridItem from '@/components/GridItem';
import SlideshowGridGallery from '@/components/SlideshowGridGallery';
import ColorLinks from '@/components/ColorLinks';

const Category = ({ products }) =>
  products.map(({ name, logos, link, colors }) => (
    <SlideshowGridGallery key={name} title={name} link={link}>
      {logos.map((logo) => (
        <GridItem
          key={logo.logo}
          product={{
            ...logo,
            name: logo.logo,
            link: `${logo.link}/${colors[0]}`.toLocaleLowerCase(),
          }}
        >
          <h4 className='mt-2 mb-2 font-medium'>{`${logo.logo} Design`}</h4>
          <ColorLinks colors={colors} link={logo.link} scroll={true} />
        </GridItem>
      ))}
    </SlideshowGridGallery>
  ));

export default Category;
