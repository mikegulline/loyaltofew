import GridItem from '@/components/GridItem';
import SlideshowGridGallery from '@/components/SlideshowGridGallery';

const Categories = ({ categories }) =>
  categories.map(({ name, link, products }) => (
    <SlideshowGridGallery key={name} title={name} link={link}>
      {products.map((product, i) => (
        <GridItem key={product.name} product={product} index={i}>
          <h4 className='mt-2 font-medium '>{product.name}</h4>
        </GridItem>
      ))}
    </SlideshowGridGallery>
  ));

export default Categories;
