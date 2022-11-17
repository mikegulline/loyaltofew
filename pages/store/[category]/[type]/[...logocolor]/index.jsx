import { getStore, getLogo, getColor } from '../../../../../data/storeModals';
import ProductPage from '../../../../../layout/ProductPage/ProductPage';
import SEO from '../../../../../components/SEO';
import getMeta from '../../../../../utils/getMeta';
// import Category from '../../../../../components/Category/Category';

const Product = ({ product }) => {
  if (!product) return <p>Loading…</p>;

  const { name, breadcrumbs, color, link } = product;

  const meta = getMeta(product.meta, `Loyal To Few (LTF) ${name} (${color})`);

  return (
    <>
      <SEO {...meta} />

      <ProductPage product={product} />
      {/* <Category category={product} /> */}
    </>
  );
};

export async function getStaticProps(context) {
  const product = getParams(context.params);

  if (!product) return { notFound: true };

  return {
    props: {
      product,
    },
  };
}

const getParams = (params) => {
  const {
    category,
    type,
    logocolor: [logo, color],
  } = params;

  let product;

  if (!color) {
    product = getLogo(category, type, logo);

    if (product) product = getColor(category, type, logo, product.colors[0]);
  } else product = getColor(category, type, logo, color);

  return product;
};

export async function getStaticPaths() {
  const paths = [];
  const { categories } = getStore();
  categories.map(({ category, products }) =>
    products.map(({ type, logos, colors }) =>
      logos.map(({ logo }) =>
        colors.map((color) =>
          paths.push({
            params: {
              category: category.toLowerCase(),
              type: type.toLowerCase(),
              logocolor: [logo.toLowerCase(), color.toLowerCase()],
            },
          })
        )
      )
    )
  );

  return {
    paths,
    fallback: true,
  };
}

export default Product;
