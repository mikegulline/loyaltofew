import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Overlay from '../components/Overlay/Overlay';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }) {
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
      <AddMotion router={router}>
        <>
          <Overlay />
          <Header />
          <div className='body'>
            <Component {...pageProps} />
          </div>
          <Footer />
        </>
      </AddMotion>
    </>
  );
}

export default MyApp;

const AddMotion = ({ router, children }) => {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        key={router.asPath}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
