// ???UPDATE
// refactor axios calls to contorler functions
import TwoFactorSetForm from '@/components/SignUpIn/TwoFactorSetForm';
import TwoFactorGetForm from '@/components/SignUpIn/TwoFactorGetForm';
import SignInForm from '@/components/SignUpIn/SignInFrom';
import SignUpForm from '@/components/SignUpIn/SignUpForm';
import InfoSplit from '@/layout/InfoSplit';
import image from '@/public/images/lifestyle/contact-page.jpg';
import WelcomScreen from '@/components/SignUpIn/WelcomeScreen';
import { getCsrfToken, getSession, signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignIn({ session, csrfToken, callbackUrl }) {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');

  const signInSteps = [
    {
      component: TwoFactorSetForm,
      props: { next: () => setStep((step) => step + 1), setEmail },
    },
    {
      component: TwoFactorGetForm,
      props: {
        next: () => setStep((step) => step + 1),
        back: () => setStep(0),
      },
    },
    {
      component: SignInForm,
      props: {
        signIn: signIn,
        csrfToken: csrfToken,
        callbackUrl: callbackUrl,
        email,
      },
    },
  ];

  const ShowSignInStep = signInSteps[step].component;

  if (session)
    return (
      <InfoSplit image={image}>
        <WelcomScreen session={session} />
      </InfoSplit>
    );

  return (
    <InfoSplit image={image}>
      <ShowSignInStep {...signInSteps[step].props} />
      <SignUpForm signIn={signIn} />
    </InfoSplit>
  );
}

/////////////////////
/////////////////////
/////////////////////
/////// Next Backend
export async function getServerSideProps(context) {
  const { req, query } = context;
  const session = await getSession({ req });
  const { callbackUrl } = query;
  if (session && callbackUrl) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }
  const csrfToken = await getCsrfToken(context);

  return {
    props: { session, csrfToken, callbackUrl: callbackUrl || '/' },
  };
}
