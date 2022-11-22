import {
  getStore,
  getLogo,
  getColor,
  getType,
} from '../../../../../data/storeModals';
import ProductPage from '../../../../../layout/ProductPage/ProductPage';
import SEO from '../../../../../components/SEO';
import getMeta from '../../../../../utils/getMeta';
import CategoryItems from '../../../../../components/Category/CategoryItems';

const Product = ({ product, logoOptions }) => {
  if (!product) return <p>Loading…</p>;

  const { name, color } = product;

  const meta = getMeta(product.meta, `Loyal To Few (LTF) ${name} (${color})`);

  return (
    <>
      <SEO {...meta} />

      <ProductPage product={product} logoOptions={logoOptions} />
    </>
  );
};

export async function getStaticProps(context) {
  const product = getParams(context.params);

  if (!product) return { notFound: true };

  const { category, type } = context.params;
  const logoOptions = getType(category, type);

  return {
    props: {
      product,
      logoOptions,
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
