import GridBlockItem from '../GridBlockItem';
import SlideshowGridGallery from '../SlideshowGridGallery';

const Categories = ({ categories }) =>
  categories.map(({ name, products }) => (
    <SlideshowGridGallery key={name} title={name}>
      {products.map((product) => (
        <GridBlockItem key={product.name} product={product}>
          <h4 className='mt-2 font-medium '>{product.name}</h4>
        </GridBlockItem>
      ))}
    </SlideshowGridGallery>
  ));

export default Categories;
