import SEO from '@/components/SEO';
import InfoSplit from '@/layout/InfoSplit';
import { P, H1 } from '@/components/Type';
import image from '@/public/images/lifestyle/about-page.jpg';

const About = () => {
  return (
    <>
      <SEO
        title='About Loyal To Few®'
        description='Learn more about Loyal To Few® and start living "A Trademarked Way Of Life."'
      />

      <InfoSplit image={image}>
        <H1 className=' text-gray-800'>About</H1>

        <P>
          Loyal To Few® is a family-owned business started by two brothers - the
          younger, a retired Firefighter/Paramedic, and the older, a former
          troublemaker turned successful entrepreneur/businessman. What began as
          a mindset, turned into a tattoo, and eventually evolved into a
          one-of-a-kind clothing brand that men and women of all ages who have
          overcome adversity can relate.
        </P>

        <P>
          The two were raised by their parents with the tenets that seem to be
          of a dying breed in today&lsquo;s society - respect, discipline, hard
          work, mental and physical fortitude, loyalty. Taught to give respect
          if you want to get it, to address adults as Sir or Ma&lsquo;am, to say
          please and thank you, to hold doors open. Taught to stay sharp, always
          be aware of your surroundings and of people&lsquo;s motives - just
          because they say they want the best for you, it ain&lsquo;t always the
          case.
        </P>

        <P>
          Starting young, they experienced adversities that would knock the
          average man off his path - sexual abuse, drug & alcohol abuse, jail,
          addiction, divorce, the deaths of loved ones from cancer, suicide, and
          street life. You name it, chances are we&lsquo;ve probably been
          through it. But we never brought our issues to the work break room or
          blasted them on social media looking for feedback from strangers. We
          found trusted mentors who had overcome the same hurdles and stayed
          within our closeknit family and small circle of friends who knew us
          best, loved us the most, and had our best interests in mind.
        </P>

        <P>
          Sometimes in life, we realize that we have let people in who
          don&lsquo;t want the best for us, who take and never give. Other
          times, we have associated ourselves with “yes men” who are complacent
          in life and complicit in negative behaviors that will never allow for
          personal growth.
        </P>

        <P>
          Surrounding ourselves with family and a small circle of friends who
          will remain in our corner, no matter how difficult the circumstances
          has become our trademarked way of life. We trim the fat, divorce the
          bullshit, and don&lsquo;t waste time or energy on people who hinder
          our personal growth and success.
        </P>

        <P>
          Loyal To Few maintains the same mindset in our everyday lives that is
          held in the fire service and in every type of life battle - you better
          trust that person standing next to you with your life. If you
          don&lsquo;t, then what&lsquo;s the point? A life with hardships is
          inevitable, but you can meet any challenge if you surround yourself
          with people who have your best interests in mind and will never turn
          their back on you. When the dust settles and you see the ones still
          standing by your side, you have found your Loyal to Few®.
        </P>
      </InfoSplit>
    </>
  );
};

export default About;
