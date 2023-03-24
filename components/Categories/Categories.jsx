import GridItem from '../GridItem';
import SlideshowGridGallery from '../SlideshowGridGallery';

const Categories = ({ categories }) =>
  categories.map(({ name, products }) => (
    <SlideshowGridGallery key={name} title={name}>
      {products.map((product) => (
        <GridItem key={product.name} product={product}>
          <h4 className='mt-2 font-medium '>{product.name}</h4>
        </GridItem>
      ))}
    </SlideshowGridGallery>
  ));

export default Categories;
