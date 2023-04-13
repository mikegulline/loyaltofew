// import { AnimatePresence, motion } from 'framer-motion';
// import PageTransition from '../components/PageTransition';
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
        <meta
          http-equiv='Content-Security-Policy'
          content='connect-src https://checkout.stripe.com;
          frame-src https://checkout.stripe.com;
          script-src https://checkout.stripe.com;
          img-src https://*.stripe.com'
        />
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
      {/* <PageTransition /> */}
      <SessionProvider session={session}>
        <Overlay />
        {/* <AnimatePresence
        mode='wait'
        initial={false}
        onExitComplete={() => {
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0 });
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          key={router.asPath}
          className='body'
        >
          <Header />
          <Component {...pageProps} />
          <Footer />
        </motion.div>
      </AnimatePresence> */}
        <Header />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </>
  );
}

export default MyApp;
