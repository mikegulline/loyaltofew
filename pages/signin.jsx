import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Input from '../components/Input';
import FormToasts from '../components/FormToasts';
import Split from '../layout/Split/Split';
import { P, H1 } from '../components/Type';
import image from '../public/images/lifestyle/contact-page.jpg';
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
  success: '',
  error: '',
};
const initialValuesSignIn = {
  email: '',
  password: '',
  success: '',
  error: '',
};

export default function SignIn({ csrfToken, callbackUrl }) {
  const router = useRouter();
  const [fetching, setFetching] = useState('');
  const [user, setUser] = useState(initialValues);
  const { name, email, password, confirm_password, success, error } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const signUpValidation = Yup.object({
    name: Yup.string()
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.')
      .required('Please enter your name.')
      .min(3, 'Name must be between 3 and 16 characters.')
      .max(16, 'Name must be between 3 and 16 characters.'),
    email: Yup.string()
      .required('Email address is required.')
      .email('Please enter a valid email.'),
    password: Yup.string()
      .required('Please enter a strong password')
      .min(8, 'Password must be at least 8 characters.')
      .max(36, 'Password can not be more than 36 characters.')
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character.'
      ),
    confirm_password: Yup.string()
      .required('Please enter a strong password')
      .oneOf([Yup.ref('password')], 'Passwords do not match.'),
  });

  const signUpHandler = async () => {
    try {
      setFetching('Signing up…');
      const { data } = await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });
      setUser({ ...user, error: '', success: data.message });
      setFetching('');
      setTimeout(async () => {
        let options = {
          redirect: false,
          email,
          password,
        };
        const res = await signIn('credentials', options);
        router.push(callbackUrl || '/');
      }, 2000);
    } catch (error) {
      setUser({ ...user, success: '', error: error.response.data.message });
      setFetching('');
    }
  };

  return (
    <Split image={image}>
      <SignInForm csrfToken={csrfToken} callbackUrl={callbackUrl} />

      <div className='hidden'>
        {fetching && <div>Loading…</div>}
        <h1>Sign Up</h1>
        <Formik
          enableReinitialize
          initialValues={{
            name,
            email,
            password,
            confirm_password,
          }}
          validationSchema={signUpValidation}
          onSubmit={() => {
            signUpHandler();
          }}
        >
          {(form) => (
            <Form>
              <Input
                type='text'
                name='name'
                icon='user'
                placeholder='Name'
                onChange={handleChange}
                value={name}
              />
              <Input
                type='text'
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
              <Input
                type='password'
                name='confirm_password'
                icon='password'
                placeholder='Confirm Password'
                onChange={handleChange}
                value={confirm_password}
              />
              <button type='submit'>Sign Up</button>
            </Form>
          )}
        </Formik>
        <FormToasts fetching={fetching} error={error} success={success} />
      </div>
    </Split>
  );
}

const SignInForm = ({ csrfToken, callbackUrl }) => {
  const [fetching, setFetching] = useState('');
  const [user, setUser] = useState(initialValuesSignIn);
  const { email, password, success, error } = user;
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
        setUser({ ...user, success: 'Redirecting…', error: '' });
      }, 4000);
      setTimeout(() => {
        setUser({ ...user, success: '', error: '' });
        // router.push(callbackUrl || '/');
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
              type='text'
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
};

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
    props: { csrfToken, callbackUrl: callbackUrl || '/' },
  };
}
