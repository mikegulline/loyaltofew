import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Container from '../components/Container/Container';
// import Script from 'next/script';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer />
      {/* <Script src='https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js' />
      <div
        hidden
        id='snipcart'
        data-api-key='N2UyNjBhNjEtOTJiOC00N2E4LWE3MmQtOTMwMDZkNzcwZDY2NjM4MDI5MTU0MjU4NjA0ODU2'
      ></div> */}
    </div>
  );
}

export default MyApp;
