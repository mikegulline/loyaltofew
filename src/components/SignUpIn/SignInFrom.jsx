import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Input from '@/components/Input';
import FormToasts from '@/components/FormToasts';
import { H1 } from '@/components/Type';
import { useRouter } from 'next/router';

/////////////////////
/////////////////////
/////////////////////
/////// SIGN IN FORM
const initialValuesSignIn = {
  email: '',
  password: '',
  success: '',
  error: '',
};

export default function SignInForm({ signIn, csrfToken, callbackUrl, email }) {
  const [fetching, setFetching] = useState('');
  const [user, setUser] = useState(initialValuesSignIn);
  const { password, success, error } = user;
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const signInHandler = async () => {
    setFetching('Signing in…');
    let options = {
      redirect: false,
      email: email,
      password: password,
    };
    const res = await signIn('credentials', options);
    setFetching('');
    if (res?.error) {
      setUser({ ...user, success: '', error: res?.error });
    } else {
      setUser({ ...user, success: 'Signed in successfully!', error: '' });
      setTimeout(() => {
        setUser({
          ...user,
          success: 'Redirecting to orders admin…',
          error: '',
        });
      }, 3000);
      setTimeout(() => {
        setUser({ ...user, success: '', error: '' });
        router.push('/admin/orders');
      }, 6000);
    }
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required('Email address is required.')
      .email('Please enter a valid email.'),
    password: Yup.string().required('Please enter a strong password'),
  });

  return (
    <div>
      <H1>Sign In</H1>
      <Formik
        enableReinitialize
        initialValues={{
          email,
          password,
        }}
        validationSchema={loginValidation}
        onSubmit={() => {
          signInHandler();
        }}
      >
        {(form) => (
          <Form
            method='post'
            action='/api/auth/signin/email'
            className='contact-form pt-10 '
          >
            <input type='hidden' name='csrfToken' defaultValue={csrfToken} />
            <Input
              type='hidden'
              name='email'
              icon='email'
              placeholder='Email Address'
              onChange={handleChange}
              value={email}
            />
            <Input
              type='password'
              name='password'
              icon='password'
              placeholder='Password'
              onChange={handleChange}
              value={password}
            />

            <button
              type='submit'
              className='mt-4 border-0 border-red-600 bg-red-600 text-white hover:bg-gray-900 disabled:opacity-25'
            >
              Sign In
            </button>
          </Form>
        )}
      </Formik>

      <FormToasts fetching={fetching} error={error} success={success} />
    </div>
  );
}
