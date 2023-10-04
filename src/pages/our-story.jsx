import SEO from '@/components/SEO';
import InfoSplit from '@/layout/InfoSplit';
import { P, H1 } from '@/components/Type';
import image from '@/public/images/lifestyle/about-page.jpg';

const OurStory = () => {
  return (
    <>
      <SEO
        title='Our Story-How we became Loyal To Few®, an American brand.'
        description='Surrounded by family and a small circle of friends who will remain in our corner, no matter how difficult the circumstances is how we became Loyal To Few®.'
      />

      <InfoSplit image={image}>
        <H1 className=' text-gray-800'>Our Story</H1>

        <P>
          Loyal To Few® is a family-owned business started by two brothers from
          southern California — the younger, a retired firefighter paramedic,
          and the older, a former troublemaker turned successful entrepreneur.
          What began as a mindset turned into a tattoo, and evolved into a
          one-of-a-kind clothing brand that anyone who has overcome adversity
          can relate to.
        </P>
        <P>
          We were raised by our parents with the tenets that seem to be of a
          dying breed today - respect, discipline, hard work, mental and
          physical fortitude, loyalty. Taught to give respect if you want to get
          it, to address adults as Sir or Ma&rsquo;am, to say please and thank
          you, to hold doors open. Taught to stay sharp, always be aware of your
          surroundings and of people&rsquo;s motives - just because they say
          they want the best for you, it isn&rsquo;t always the case.
        </P>
        <P>
          Starting young, we experienced adversities that would knock the
          average man off his path — sexual abuse, drug & alcohol abuse, jail,
          addiction, divorce, the deaths of loved ones from cancer, suicide, and
          street life. But we never brought our issues to the work break room or
          blasted them on social media looking for feedback from strangers. We
          found trusted mentors who had overcome the same hurdles and stayed
          within our closeknit family and small circle of friends who knew us
          best, loved us the most, and had our best interests in mind.
        </P>
        <P>
          Sometimes in life, we realize we have let people in who don&rsquo;t
          want the best for us, who take and never give. Other times, we have
          associated ourselves with “yes men” who are complacent in life and
          complicit in negative behaviors that will never allow for personal
          growth. Surrounding ourselves with family and a small circle of
          friends who will remain in our corner, no matter how difficult the
          circumstances has become our trademarked way of life. We trim the fat,
          divorce the bullshit, and don&rsquo;t waste time or energy on people
          who hinder our personal growth and success.
        </P>
        <P>
          LTF Clothing Brand represents the blood, the sweat, and the tears of
          the inner struggles we all deal with on an everyday basis. It
          represents and supports the first responders or anyone battling
          addiction or abuse and what it takes to overcome hiding from their own
          dark truths. LTF maintains the same mindset that is held in the fire
          service and really any type of life battle — You better trust that
          person standing next to you with your life. If you don&rsquo;t, then
          what&rsquo;s the point? A life with hardships is inevitable, but you
          can meet any challenge if you surround yourself with people who have
          your best interests in mind and will never turn their backs on you.
          They are your Loyal to Few!
        </P>
        <P>
          <strong>Thank you for your support</strong> — We look forward to
          paving the way for others like us. As our business grows, so will the
          opportunities for us to pay it forward, much like what was done for
          us.
        </P>
      </InfoSplit>
    </>
  );
};

export default OurStory;
