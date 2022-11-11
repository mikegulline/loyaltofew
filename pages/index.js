import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
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

      <main>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1 className={styles.title}>
          <Link href='/store'>Shop</Link>
        </h1>
        <br />
        <br />
      </main>

      <Script src='https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js' />
      <div
        hidden
        id='snipcart'
        data-api-key='N2UyNjBhNjEtOTJiOC00N2E4LWE3MmQtOTMwMDZkNzcwZDY2NjM4MDI5MTU0MjU4NjA0ODU2'
      ></div>
    </div>
  );
}
