import Head from 'next/head';
import { getStore, getLogo } from '../../../../../data/storeModals';
import Breadcrumbs from '../../../../../components/breadcrumbs';
import ProductPage from '../../../../../components/ProductPage/ProductPage';
import getMeta from '../../../../../utils/getMeta';

const Product = ({ product }) => {
  if (!product) return <p>Loading…</p>;

  const { name, link, breadcrumbs } = product;

  const meta = getMeta(product.meta, `Loyal To Few (LTF) ${name}`);

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
  const { category, type, logo } = context.params;
  const product = getLogo(category, type, logo);

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
    products.map(({ type, logos }) =>
      logos.map(({ logo }) =>
        paths.push({
          params: {
            category: category.toLowerCase(),
            type: type.toLowerCase(),
            logo: logo.toLowerCase(),
          },
        })
      )
    )
  );

  return {
    paths,
    fallback: true,
  };
}

export default Product;
