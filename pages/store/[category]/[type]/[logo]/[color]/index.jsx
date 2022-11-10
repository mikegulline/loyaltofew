import Head from 'next/head';
import { getStore, getColor } from '../../../../../../data/storeModals';
import Breadcrumbs from '../../../../../../components/breadcrumbs';
import ProductPage from '../../../../../../components/ProductPage/ProductPage';
import getMeta from '../../../../../../utils/getMeta';

const Product = ({ product }) => {
  if (!product) return <p>Loading…</p>;

  const { name, breadcrumbs, color, link } = product;

  const meta = getMeta(product.meta, `Loyal To Few (LTF) ${name} (${color})`);

  return (
    <div key={link}>
      <Head>
        <title>{meta.title}</title>
        <meta name='description' content={meta.description} />
      </Head>
      <Breadcrumbs links={breadcrumbs} />
      <ProductPage product={product} />
    </div>
  );
};

export async function getStaticProps(context) {
  const { category, type, logo, color } = context.params;
  const product = getColor(category, type, logo, color);

  if (!product) return { notFound: true };

  return {
    props: {
      product,
    },
  };
}

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
              logo: logo.toLowerCase(),
              color: color.toLowerCase(),
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
