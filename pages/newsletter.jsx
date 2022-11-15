import Head from 'next/head';
import Container from '../components/Container/Container';

const Newsletter = () => {
  return (
    <>
      <Head>
        <title>Loyal To Few Newsletter</title>
        <meta
          name='description'
          content='Learn more about Loyal To Few and start living "A Trademarked Way Of Life."'
        />
      </Head>
      <main>
        <Container>
          <h1>Join The Few: Newsletter</h1>
        </Container>
      </main>
    </>
  );
};

export default Newsletter;
