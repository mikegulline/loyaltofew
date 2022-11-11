import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Container from '../components/Container/Container';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer />
    </div>
  );
}

export default MyApp;
