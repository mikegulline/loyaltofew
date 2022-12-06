import { getStore } from '../../data/storeModals';
import Categories from '../../components/Categories/Categories';
import StoreWrapper from '../../layout/StoreWrapper/StoreWrapper';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { breadcrumbs } from '../../data/menu';
import SEO from '../../components/SEO';

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
      <Breadcrumbs links={breadcrumbs} />
      <StoreWrapper title='Store'>
        <Categories categories={categories} />
      </StoreWrapper>
    </>
  );
};

export async function getStaticProps() {
  const store = getStore();

  if (!store) return { notFound: true };

  return {
    props: {
      ...store,
    },
  };
}

export default CategoriesPage;
