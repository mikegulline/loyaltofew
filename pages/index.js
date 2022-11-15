import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Loyal To Few</title>
        <meta name='description' content='A Trademarked Way Of Life.' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href='/store'>Shop</Link>
        </h1>
        <br />
        <p className={styles.menu}>
          <Link href='/store/mens'>Mens</Link>,{' '}
          <Link href='/store/womens'>Womens</Link>,{' '}
          <Link href='/store/outerwear'>Outerwear</Link>,{' '}
          <Link href='/store/hats'>Hats</Link>
        </p>
      </main>
    </div>
  );
}
