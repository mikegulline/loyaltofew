import Head from 'next/head';
import Container from '../components/Container/Container';

const About = () => {
  return (
    <>
      <Head>
        <title>About Loyal To Few</title>
        <meta
          name='description'
          content='Learn more about Loyal To Few and start living "A Trademarked Way Of Life."'
        />
      </Head>
      <main>
        <Container>
          <h1>About</h1>
          <p>
            Loyal To Few is a family-owned business started in 2020 by a retired
            firefighter/paramedic. What began as a simple mindset, turned into a
            tattoo, and eventually evolved into a one-of-a-kind clothing brand
            that men and women of all ages and backgrounds can relate to.
          </p>

          <p>
            We acquired the domain name, built a website, secured an official
            Trademark, and got to work building our 100% American-made brand in
            our home state of California.{' '}
          </p>

          <p>
            People often come into your life and despite what they may say,
            don’t really want the best for you. Surrounding yourself with family
            and a small circle of friends that will remain in your corner no
            matter how difficult the circumstances, has become our trademarked
            way of life. Trim the fat, divorce the bullshit and don’t waste time
            or energy on people that hinder your personal growth.
          </p>

          <p>
            Life will always find a way to throw its share of negative
            situations your way, but you must figure out a way through them.
            When the dust settles and you see the ones still standing by your
            side, you have found your Loyal to Few.
          </p>
        </Container>
      </main>
    </>
  );
};

export default About;
