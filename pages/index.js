import Head from 'next/head';
import Link from 'next/link';
import Slideshow from '../components/Slideshow/Slideshow';
import Container from '../components/Container/Container';

import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Loyal To Few</title>
        <meta name='description' content='A Trademarked Way Of Life.' />
      </Head>
      <Container>
        <Slideshow />
      </Container>
    </div>
  );
}
