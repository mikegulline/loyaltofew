import { H1, P } from '@/components/Type';
import { signOut } from 'next-auth/react';

export default function WelcomScreen({ session }) {
  console.log('WelcomScreen');
  return (
    <div>
      <H1>Welcome </H1>
      <P>{session.user.name}. You are currently signed in. </P>

      <P>
        <button
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
          className='font-lighter rounded border border-gray-900 bg-gray-900 text-lg text-white hover:border-red-600 hover:bg-red-600'
        >
          Sign out
        </button>
      </P>
    </div>
  );
}
