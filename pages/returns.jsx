import Head from 'next/head';
import Container from '../components/Container/Container';

const Returns = () => {
  return (
    <>
      <Head>
        <title>Orders/Returns: Loyal To Few</title>
        <meta
          name='description'
          content="You didn't love your super awesome Loyal To Few gear? To request a return, please fill the required information on our contact page including your name, email address, order number and reason for the return / exchange."
        />
      </Head>
      <main>
        <Container>
          <h1>Orders/Returns </h1>
          <p>
            Orders will be processed and shipped within 3-5 business days. You
            will receive an email confirmation once the order is received, as
            well as an email with tracking information once the shipment is
            sent.
          </p>
          <p>
            To request a return, please fill the required information on our
            contact page including your name, email address, order number and
            reason for the return / exchange. Once received, we will review the
            order and issue a replacement or a refund.
          </p>
        </Container>
      </main>
    </>
  );
};

export default Returns;
