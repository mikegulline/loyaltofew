import Head from 'next/head';
import { getStore, getType } from '../../../../data/storeModals';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CategoryItems from '../../../../components/Category/CategoryItems';
import getMeta from '../../../../utils/getMeta';

const Products = ({ product }) => {
  if (!product?.logos?.length) return <p>Loading…</p>;

  const { breadcrumbs, name } = product;

  const meta = getMeta(product.meta, `Loyal To Few (LTF) ${name}`);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name='description' content={meta.description} />
      </Head>
      <Breadcrumbs links={breadcrumbs} />
      <CategoryItems key={product.name} product={product} />
    </>
  );
};

export async function getStaticProps(context) {
  const { category, type } = context.params;

  const product = getType(category, type);

  if (!product) return { notFound: true };

  return {
    props: {
      product,
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
