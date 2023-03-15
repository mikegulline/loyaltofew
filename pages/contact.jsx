import SEO from '../components/SEO';
import Split from '../layout/Split/Split';
import { P, H1 } from '../components/Type';
import image from '../public/images/lifestyle/contact-page.jpg';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <>
      <SEO
        title='Contact Loyal To Few'
        description='Get in touch with Loyal To Few and start living "A Trademarked Way Of Life."'
      />

      <Split image={image}>
        <H1 className='text-gray-800'>Contact</H1>
        <P>
          Get in touch with Loyal To Few and start living &quot;A Trademarked
          Way Of Life.&quot;
        </P>

        <ContactForm />
      </Split>
    </>
  );
};

export default Contact;
