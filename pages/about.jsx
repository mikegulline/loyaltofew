import SEO from '../components/SEO';
import InfoPage from '../layout/InfoPage/InfoPage';
import { P, H1 } from '../components/Type';

const About = () => {
  return (
    <>
      <SEO
        title='About Loyal To Few'
        description='Learn more about Loyal To Few and start living "A Trademarked Way Of Life."'
      />

      <InfoPage>
        <H1 className='mt-10 text-gray-800'>About</H1>

        <P>
          Loyal To Few® is a family-owned business started by a retired
          firefighter/paramedic. What began as a mindset for survival, turned
          into a tattoo, and eventually evolved into a one-of-a-kind clothing
          brand that men and women of all ages who have overcome adversity can
          relate to.
        </P>

        <P>
          Sometimes in life you realize you have let people in who don't want
          the best for you, who take and never give. Surrounding yourself with
          family and a small circle of friends who will remain in your corner no
          matter how difficult the circumstances has become our trademarked way
          of life. Trim the fat, divorce the bullshit, and don't waste time or
          energy on people who hinder your personal growth and success.
        </P>

        <P>
          A life without hardships is inevitable, but you can meet any challenge
          if you surround yourself with people who have your best interests in
          mind and will never turn their backs on you. When the dust settles and
          you see the ones still standing by your side, you have found your
          Loyal to Few.
        </P>
      </InfoPage>
    </>
  );
};

export default About;
