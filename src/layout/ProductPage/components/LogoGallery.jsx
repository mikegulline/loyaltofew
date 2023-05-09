import Container from '@/components/Container';
import SlideshowGridGallery from '@/components/SlideshowGridGallery';
import GridItem from '@/components/GridItem';
import GridItemSelectDot from '@/components/GridItemSelectDot';

const LogoGallery = ({ product }) => {
  if (product.logos.length <= 1) return null;

  return (
    <Container className='pt-8'>
      <SlideshowGridGallery title='Logo Options'>
        {product.logos.map((logo, i) => {
          const { link, image, imageBlur, logo: logoName } = logo;
          const current = product.logo === logo.logo;
          const name = `${product.name_root} with ${logoName} Design (${product.color})`;
          const buildProduct = {
            link,
            image,
            imageBlur,
            name,
          };
          return (
            <GridItem key={name} product={buildProduct} scroll={true} index={i}>
              <GridItemSelectDot current={current} />
              <h4 className='mt-2 font-medium'>{`${logoName} Design`}</h4>
            </GridItem>
          );
        })}
      </SlideshowGridGallery>
    </Container>
  );
};

export default LogoGallery;
