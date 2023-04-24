import Head from 'next/head';
import HomeSlideshow from '@/components/Slideshow/HomeSlideshow';
import store from '@/public/data/store';
import Categories from '@/components/Categories/Categories';
import Container from '@/components/Container';
import Breadcrumbs from '@/components/Breadcrumbs';
import { breadcrumbs } from '@/data/menu';

export default function Home({ categories }) {
  return (
    <div>
      <Head>
        <title>Loyal To Few®</title>
        <meta name='description' content='A Trademarked Way Of Life.' />
      </Head>
      <Breadcrumbs links={breadcrumbs} />
      <Container size='large'>
        <HomeSlideshow />
      </Container>
      <Container className='mt-8'>
        <Categories categories={categories} />
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const { categories } = store;

  if (!categories) return { notFound: true };

  return {
    props: {
      categories,
    },
  };
}
