import getMeta from '@/utils/getMeta';
import StoreWrapper from '@/layout/StoreWrapper/StoreWrapper';
import SEO from '@/components/SEO';
import SlideshowGridGallery from '@/components/SlideshowGridGallery';
import GridItem from '@/components/GridItem';
import store from '@/public/data/store';
let fs = require('fs');

const Products = ({ product, breadcrumbs, name }) => {
  if (!product?.logos?.length) return <p>Loading…</p>;

  const meta = getMeta(product.meta, `Loyal To Few® (LTF) ${name}`);

  return (
    <>
      <SEO {...meta} />

      <StoreWrapper breadcrumbs={breadcrumbs} title={product.name}>
        {product.colors.map((color) => (
          <SlideshowGridGallery title={color} key={color}>
            {product.logos.map((logo) => {
              const { link, name, imageColorRoot, logo: logoName } = logo;
              const buildProduct = {
                link: `${link}/${color.toLowerCase()}`,
                image: `${imageColorRoot}${color}.jpg`,
                name,
              };
              return (
                <GridItem key={name} product={buildProduct}>
                  <h4 className='mt-2 font-medium'>{`${logoName} Design`}</h4>
                </GridItem>
              );
            })}
          </SlideshowGridGallery>
        ))}
      </StoreWrapper>
    </>
  );
};

export async function getStaticProps(context) {
  const { category, type } = context.params;

  const product = await JSON.parse(
    fs.readFileSync(`public/data/${category}-${type}.json`, 'utf8')
  );

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

  store['categories'].map(({ category, products }) =>
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