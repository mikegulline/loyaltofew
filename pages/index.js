import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Loyal To Few</title>
        <meta name='description' content='A Trademarked Way Of Life.' />
        <link rel='preconnect' href='https://app.snipcart.com' />
        <link rel='preconnect' href='https://cdn.snipcart.com' />
        <link
          rel='stylesheet'
          href='https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.css'
        />
        <link rel='icon' href='/favicon.ico' />
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
