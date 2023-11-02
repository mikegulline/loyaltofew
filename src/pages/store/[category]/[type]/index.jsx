import getMeta from '@/utils/getMeta';
import StoreWrapper from '@/layout/StoreWrapper';
import SEO from '@/components/SEO';
import SlideshowGridGallery from '@/components/SlideshowGridGallery';
import GridItem from '@/components/GridItem';
import storeNew from '@/public/data/store-new';
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
            {product.logos
              .filter((logo) => {
                const { colors: logoColors } = logo;
                if (logoColors.indexOf(color) < 0) return false;
                return true;
              })
              .map((logo, i) => {
                const { link, name, imageColorRoot, logo: logoName } = logo;
                const buildProduct = {
                  link: `${link}/${color.toLowerCase()}`,
                  image: `${imageColorRoot}${color}.jpg`,
                  name,
                };

                return (
                  <GridItem key={name} product={buildProduct} index={i}>
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

  storeNew['categories'].map(({ category, products }) =>
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
