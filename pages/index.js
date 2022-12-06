import Head from 'next/head';
import Slideshow from '../components/Slideshow/Slideshow';
import Container from '../components/Container/Container';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { breadcrumbs } from '../data/menu';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Loyal To Few</title>
        <meta name='description' content='A Trademarked Way Of Life.' />
      </Head>
      <Breadcrumbs links={breadcrumbs} />
      <Container size='large'>
        <Slideshow />
      </Container>
    </div>
  );
}
