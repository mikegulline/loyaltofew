import Head from 'next/head';
import { getStore, getCategory } from '../../../data/storeModals';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import Category from '../../../components/Category/Category';
import getMeta from '../../../utils/getMeta';
import Container from '../../../components/Container/Container';

const CategoryPage = ({ category }) => {
  if (!category) return <p>Loading…</p>;

  const meta = getMeta(
    category.meta,
    `Loyal To Few (LTF) ${category.name} Products`
  );

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name='description' content={meta.description} />
      </Head>
      <main>
        <Breadcrumbs links={category.breadcrumbs} />
        <Container>
          <Category category={category} />
        </Container>
      </main>
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
