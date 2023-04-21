import SEO from '@/components/SEO';
import Split from '@/layout/Split/Split';
import { P, H1 } from '@/components/Type';
import image from '@/public/images/lifestyle/orders-page.jpg';
import Link from 'next/link';

const Returns = () => {
  return (
    <>
      <SEO
        title='Orders &amp; Returns: Loyal To Few®'
        description="You didn't love your super awesome Loyal To Few® gear? To request a return, please fill the required information on our contact page including your name, email address, order number and reason for the return / exchange."
      />

      <Split image={image}>
        <H1 className='text-gray-800'>Orders &amp; Returns </H1>

        <P>
          Orders will be processed and shipped within 5-7 business days. You
          will receive an email confirmation once the order is received, as well
          as an email with tracking information once the shipment is sent.
        </P>

        <P>
          Returns / Exchanges must be within 30 days of receiving your order.{' '}
        </P>

        <P>
          To return an item, please fill the required information on our{' '}
          <Link
            href='/contact'
            className='text-red-600 underline hover:text-black'
          >
            contact page
          </Link>{' '}
          including your name, email address, order number and reason for the
          return. Once that information is submitted, we will email you a
          shipping label for your return. Once we receive the item, we will
          review the order and issue a refund.
        </P>

        <P>
          To exchange an item, please place a new order for the correct item.
          Once the new order is placed, please go to our contact page and fill
          out the required information including your name, email address, order
          number and the reason for the exchange. Once that information is
          submitted, we will email you a return shipping label for your
          exchange. Once we receive the original item, we will review the order
          and issue a refund.
        </P>
      </Split>
    </>
  );
};

export default Returns;
