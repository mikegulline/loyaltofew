import SEO from '../components/SEO';
import InfoPage from '../layout/InfoPage/InfoPage';
import { P, H1 } from '../components/Type';

const Returns = () => {
  return (
    <>
      <SEO
        title='Orders/Returns: Loyal To Few'
        description="You didn't love your super awesome Loyal To Few gear? To request a return, please fill the required information on our contact page including your name, email address, order number and reason for the return / exchange."
      />

      <InfoPage>
        <H1>Returns </H1>
        <P>
          Orders will be processed and shipped within 3-5 business days. You
          will receive an email confirmation once the order is received, as well
          as an email with tracking information once the shipment is sent.
        </P>
        <P>
          To request a return, please fill the required information on our
          contact page including your name, email address, order number and
          reason for the return / exchange. Once received, we will review the
          order and issue a replacement or a refund.
        </P>
      </InfoPage>
    </>
  );
};

export default Returns;
