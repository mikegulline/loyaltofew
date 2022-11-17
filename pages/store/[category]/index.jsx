import { getStore, getCategory } from '../../../data/storeModals';
import Category from '../../../components/Category/Category';
import StoreWrapper from '../../../layout/StoreWrapper/StoreWrapper';
import SEO from '../../../components/SEO';

const CategoryPage = ({ category }) => {
  if (!category) return <p>Loading…</p>;

  const meta = category.meta;
  console.log(category);
  return (
    <>
      <SEO {...meta} />

      <StoreWrapper breadcrumbs={category.breadcrumbs} title={category.name}>
        <Category category={category} />
      </StoreWrapper>
    </>
  );
};

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

export async function getStaticProps(context) {
  const category = getCategory(context.params.category);

  if (!category) return { notFound: true };

  return {
    props: {
      category,
    },
  };
}

export async function getStaticPaths() {
  const paths = getStore()['categories'].map(({ category }) => ({
    params: { category: category.toLowerCase() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default CategoryPage;
