import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Input from '@/components/Input';
import FormToasts from '@/components/FormToasts';
import { H1 } from '@/components/Type';
import axios from 'axios';
import { useRouter } from 'next/router';

/////////////////////
/////////////////////
/////////////////////
/////// SIGN UP FORM
const initialValuesSignUp = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
  secret_code: '',
  success: '',
  error: '',
};

export default function SignUpForm({ signIn }) {
  const router = useRouter();
  const [fetching, setFetching] = useState('');
  const [user, setUser] = useState(initialValuesSignUp);
  const {
    name,
    email,
    password,
    confirm_password,
    secret_code,
    success,
    error,
  } = user;

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
    secret_code: Yup.string()
      .required('Please enter your secret code.')
      .min(3, 'Secret code must be between 3 and 16 characters.')
      .max(16, 'Secret code must be between 3 and 16 characters.'),
  });

  const signUpHandler = async () => {
    try {
      setFetching('Signing up…');
      const { data } = await axios.post('/api/auth/signup', {
        name,
        email,
        password,
        secret_code,
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
        router.push('/admin/orders');
      }, 2000);
    } catch (error) {
      setUser({ ...user, success: '', error: error.response.data.message });
      setFetching('');
    }
  };
  return (
    <div className='mt-10'>
      <H1>Sign Up</H1>
      <Formik
        enableReinitialize
        initialValues={{
          name,
          email,
          password,
          confirm_password,
          secret_code,
        }}
        validationSchema={signUpValidation}
        onSubmit={() => {
          signUpHandler();
        }}
      >
        {(form) => (
          <Form className='contact-form pt-10 '>
            <Input
              type='text'
              name='name'
              placeholder='Name'
              onChange={handleChange}
              value={name}
            />
            <Input
              type='text'
              name='email'
              placeholder='Email Address'
              onChange={handleChange}
              value={email}
            />
            <Input
              type='password'
              name='password'
              placeholder='Password'
              onChange={handleChange}
              value={password}
            />
            <Input
              type='password'
              name='confirm_password'
              placeholder='Confirm Password'
              onChange={handleChange}
              value={confirm_password}
            />
            <Input
              type='text'
              name='secret_code'
              placeholder='Secret Code'
              onChange={handleChange}
              value={secret_code}
            />
            <button
              type='submit'
              className='mt-4 border-0 border-red-600 bg-red-600 text-white hover:bg-gray-900 disabled:opacity-25'
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      <FormToasts fetching={fetching} error={error} success={success} />
    </div>
  );
}
