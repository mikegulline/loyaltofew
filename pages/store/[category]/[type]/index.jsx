import { getStore, getType } from '../../../../data/storeModals';
import getMeta from '../../../../utils/getMeta';
import StoreWrapper from '../../../../layout/StoreWrapper/StoreWrapper';
import SEO from '../../../../components/SEO';
import SlideshowGridGallery from '../../../../components/SlideshowGridGallery';
import GridBlockItem from '../../../../components/GridBlockItem';

const Products = ({ product, breadcrumbs, name }) => {
  if (!product?.logos?.length) return <p>Loading…</p>;

  const galleryArray = product.logos.map(
    ({ link, name, imageColorRoot, logo }) => {
      const color = product.colors[0];
      return (
        <GridBlockItem
          key={name}
          product={{
            link: `${link}/${color.toLowerCase()}`,
            image: `${imageColorRoot}${color}.jpg`,
            name,
          }}
        >
          <h4 className='mt-2 font-medium'>{`${logo} Design`}</h4>
        </GridBlockItem>
      );
    }
  );

  const meta = getMeta(product.meta, `Loyal To Few (LTF) ${name}`);
  console.log(product);
  return (
    <>
      <SEO {...meta} />

      <StoreWrapper breadcrumbs={breadcrumbs} title={product.name}>
        <SlideshowGridGallery title='Logo Options'>
          {galleryArray}
        </SlideshowGridGallery>
      </StoreWrapper>
    </>
  );
};

export async function getStaticProps(context) {
  const { category, type } = context.params;

  const product = getType(category, type);

  if (!product) return { notFound: true };

  const { breadcrumbs, name } = product;

  return {
    props: {
      product,
      breadcrumbs,
      name,
    },
  };
}

export async function getStaticPaths() {
  const paths = [];

  getStore()['categories'].map(({ category, products }) =>
    products.map(({ type }) =>
      paths.push({
        params: { category: category.toLowerCase(), type: type.toLowerCase() },
      })
    )
  );

  return {
    paths,
    fallback: true,
  };
}

export default Products;
