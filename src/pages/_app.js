import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Overlay from '@/components/Overlay';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import '@/styles/globals.css';

function MyApp({ Component, pageProps, session, router }) {
  return (
    <>
      <Head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/images/favicon_io/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/images/favicon_io/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/images/favicon_io/favicon-16x16.png'
        />
        <link rel='manifest' href='/images/favicon_io/site.webmanifest' />
      </Head>
      <SessionProvider session={session}>
        <Overlay />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </>
  );
}

export default MyApp;
