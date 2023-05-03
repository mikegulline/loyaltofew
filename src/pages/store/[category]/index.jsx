import storeNew from '@/public/data/store-new';
import StoreWrapper from '@/layout/StoreWrapper';
import Category from '@/components/Category/Category';
import SEO from '@/components/SEO';
let fs = require('fs');

const CategoryPage = ({ category }) => {
  if (!category) return <p>Loading…</p>;

  const meta = category.meta;

  return (
    <>
      <SEO {...meta} />
      <StoreWrapper breadcrumbs={category.breadcrumbs} title={category.name}>
        <Category products={category.products} />
      </StoreWrapper>
    </>
  );
};

export async function getStaticProps(context) {
  const category = await JSON.parse(
    fs.readFileSync(`public/data/${context.params.category}.json`, 'utf8')
  );

  if (!category) return { notFound: true };

  return {
    props: {
      category,
    },
  };
}

export async function getStaticPaths() {
  const paths = storeNew['categories'].map(({ category }) => ({
    params: { category: category.toLowerCase() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default CategoryPage;
