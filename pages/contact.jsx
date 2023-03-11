import SEO from '../components/SEO';
import InfoPage from '../layout/InfoPage/InfoPage';
import { P, H1 } from '../components/Type';

const Contact = () => {
  return (
    <>
      <SEO
        title='Contact Loyal To Few'
        description='Get in touch with Loyal To Few and start living "A Trademarked Way Of Life."'
      />

      <InfoPage>
        <H1 className='mt-10 text-gray-800'>Contact</H1>
        <P>
          Get in touch with Loyal To Few and start living &quot;A Trademarked
          Way Of Life.&quot;
        </P>
      </InfoPage>
    </>
  );
};

export default Contact;
