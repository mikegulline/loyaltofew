import Head from 'next/head';
import SlideShowTouch from '../components/SlideShowTouch';
import Container from '../components/Container';
import Breadcrumbs from '../components/Breadcrumbs';
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
        <SlideShowTouch />
      </Container>
    </div>
  );
}
