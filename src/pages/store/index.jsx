import { getStore } from '@/data/storeModals';
import Categories from '@/components/Categories/Categories';
import StoreWrapper from '@/layout/StoreWrapper/StoreWrapper';
import { breadcrumbs } from '@/data/menu';
import SEO from '@/components/SEO';

const CategoriesPage = ({ categories }) => {
  if (!categories) return <p>Loading…</p>;

  const meta = {
    title: 'Loyal To Few (LTF) Clothing Store',
    description:
      'Live a trademarked way of life in Loyal To Few Hoodies, Tanks, Tees, Crops and Hats. We got your back!',
  };

  return (
    <>
      <SEO {...meta} />
      <StoreWrapper title='Store' breadcrumbs={breadcrumbs}>
        <Categories categories={categories} />
      </StoreWrapper>
    </>
  );
};

export async function getStaticProps() {
  const { categories } = getStore();

  if (!categories) return { notFound: true };

  return {
    props: {
      categories,
    },
  };
}

export default CategoriesPage;
