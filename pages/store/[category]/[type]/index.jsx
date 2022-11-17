import { getStore, getType } from '../../../../data/storeModals';
import CategoryItems from '../../../../components/Category/CategoryItems';
import getMeta from '../../../../utils/getMeta';
import StoreWrapper from '../../../../layout/StoreWrapper/StoreWrapper';
import SEO from '../../../../components/SEO';

const Products = ({ product, breadcrumbs, name }) => {
  if (!product?.logos?.length) return <p>Loading…</p>;

  const meta = getMeta(product.meta, `Loyal To Few (LTF) ${name}`);

  return (
    <>
      <SEO {...meta} />

      <StoreWrapper breadcrumbs={breadcrumbs} title={product.name}>
        <CategoryItems
          key={product.name}
          product={product}
          title='Logo Options'
        />
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
