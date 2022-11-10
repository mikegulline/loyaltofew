import Head from 'next/head';
import { getStore } from '../../data/storeModals';
import Breadcrumbs from '../../components/breadcrumbs';
import Categories from '../../components/Categories/Categories';

const CategoriesPage = ({ store }) => {
  if (!store) return <p>Loading…</p>;

  const { categories, breadcrumbs } = store;

  const meta = {
    title: 'Loyal To Few (LTF) Clothing Store',
    description:
      'Live a trademarked way of life in Loyal To Few Hoodies, Tanks, Tees, Crops and Hats. We got your back!',
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name='description' content={meta.description} />
      </Head>
      <Breadcrumbs links={breadcrumbs} />
      <Categories categories={categories} />
    </>
  );
};

export async function getStaticProps() {
  const store = getStore();

  if (!store) return { notFound: true };

  return {
    props: {
      store,
    },
  };
}

export default CategoriesPage;
