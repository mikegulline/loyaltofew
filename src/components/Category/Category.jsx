import GridItem from '@/components/GridItem';
import SlideshowGridGallery from '@/components/SlideshowGridGallery';
import ColorLinks from '@/components/ColorLinks';

const Category = ({ products }) => (
  <div className='gap-3 md:grid md:grid-cols-3 lg:grid-cols-4 xl:gap-8'>
    {products.map(({ name, logos, link, colors }) => (
      <div className={`${logos.length > 2 && ' col-span-4'}`} key={link}>
        <SlideshowGridGallery title={name} link={link}>
          {logos.map((logo, i) => {
            return (
              <GridItem
                key={logo.logo}
                product={{
                  ...logo,
                  name: logo.logo,
                  link: `${logo.link}/${colors[0]}`.toLocaleLowerCase(),
                }}
                index={i}
              >
                <h4 className='mt-2 mb-2 font-medium'>{`${logo.logo}`}</h4>
                <ColorLinks
                  colors={logo.colors}
                  link={logo.link}
                  scroll={true}
                  small
                />
              </GridItem>
            );
          })}
        </SlideshowGridGallery>
      </div>
    ))}
  </div>
);

export default Category;
