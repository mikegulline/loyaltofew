import GridItem from '@/components/GridItem';
import SlideshowGridGallery from '@/components/SlideshowGridGallery';

const Categories = ({ categories }) => (
  <div className='gap-3 md:grid md:grid-cols-2 xl:gap-8'>
    {categories.map(({ name, link, products }) => (
      <div className={`${products.length > 2 && ' col-span-2'}`} key={name}>
        <SlideshowGridGallery title={name} link={link}>
          {products.map((product, i) => (
            <GridItem
              key={`${name} ${product.name}`}
              product={product}
              index={i}
            >
              <h4 className='mt-2 font-medium '>{product.name}</h4>
            </GridItem>
          ))}
        </SlideshowGridGallery>
      </div>
    ))}
  </div>
);

export default Categories;
