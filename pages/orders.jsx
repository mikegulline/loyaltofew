import SEO from '../components/SEO';
import Split from '../layout/Split/Split';
import { P, H1 } from '../components/Type';
import image from '../public/images/lifestyle/contact-page.jpg';
import Link from 'next/link';

const Returns = () => {
  return (
    <>
      <SEO
        title='Orders &amp; Returns: Loyal To Few'
        description="You didn't love your super awesome Loyal To Few gear? To request a return, please fill the required information on our contact page including your name, email address, order number and reason for the return / exchange."
      />

      <Split image={image}>
        <H1 className='mt-10 text-gray-800'>Orders &amp; Returns </H1>
        <P>
          Orders will be processed and shipped within 3-5 business days. You
          will receive an email confirmation once the order is received, as well
          as an email with tracking information once the shipment is sent.
        </P>
        <P>
          To request a return, please fill the required information on our{' '}
          <Link
            href='/contact'
            className='text-red-600 underline hover:text-black'
          >
            contact page
          </Link>{' '}
          including your name, email address, order number and reason for the
          return / exchange. Once received, we will review the order and issue a
          replacement or a refund.
        </P>
      </Split>
    </>
  );
};

export default Returns;
