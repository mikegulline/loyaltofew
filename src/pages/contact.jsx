import SEO from '@/components/SEO';
import InfoSplit from '@/layout/InfoSplit';
import { P, H1 } from '@/components/Type';
import image from '@/public/images/lifestyle/contact-page.jpg';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  return (
    <>
      <SEO
        title='Contact-Get in touch with Loyal To Few®'
        description='Use our automated order return system on our Contact page or email orders@loyaltofew.com with any questions about our American made clothing brand.'
      />

      <InfoSplit image={image}>
        <H1 className='text-gray-800'>Contact</H1>
        <P>
          Get in touch with Loyal To Few® and start living &quot;A Trademarked
          Way Of Life.&quot;
        </P>
        <ContactForm />
      </InfoSplit>
    </>
  );
};

export default Contact;
