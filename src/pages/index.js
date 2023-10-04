import Head from 'next/head';
import HomeSlideshow from '@/components/Slideshow/HomeSlideshow';
// import store from '@/public/data/store';
import storeNew from '@/public/data/store-new';
import Categories from '@/components/Categories/Categories';
import Container from '@/components/Container';
import Breadcrumbs from '@/components/Breadcrumbs';
import { breadcrumbs } from '@/data/menu';

export default function Home({ categories }) {
  return (
    <div>
      <Head>
        <title>Loyal To Few®-A Trademarked Way of Life. Made in the USA</title>
        <meta
          name='description'
          content='American made streetwear for those who keep a small circle of family & friends that will never turn their backs on you.'
        />
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
  const { categories } = storeNew;

  if (!categories) return { notFound: true };

  return {
    props: {
      categories,
    },
  };
}
