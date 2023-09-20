import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Input from '@/components/Input';
import FormToasts from '@/components/FormToasts';
import { H1 } from '@/components/Type';

/////////////////////
/////////////////////
/////////////////////
/////// TwoFactorSetForm Step One
const initialValuesTwoFactor = {
  email: '',
  success: '',
  error: '',
};

export default function TwoFactorSetForm({ next, setEmail }) {
  const [fetching, setFetching] = useState('');
  const [user, setUser] = useState(initialValuesTwoFactor);
  const { email, success, error } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const twoFactorSetHandler = async () => {
    setFetching('Getting secure token…');
    let options = {
      redirect: false,
      email: email,
    };
    // hit api
    const response = await fetch('/api/auth/twofactorset', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const { success, message } = await response.json();

    setFetching('');

    if (!success) {
      setUser({ ...user, success: '', error: message });
    } else {
      setUser({ ...user, success: message, error: '' });
      setTimeout(() => {
        setUser({
          ...user,
          success: 'Loading validation from…',
          error: '',
        });
      }, 2000);
      setTimeout(() => {
        setUser({ ...user, success: '', error: '' });
      }, 4000);
      setTimeout(() => {
        setEmail(email);
        next();
      }, 5000);
    }
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required('Email address is required.')
      .email('Please enter a valid email.'),
  });

  return (
    <div>
      <H1>Two Factor Auth</H1>
      <Formik
        enableReinitialize
        initialValues={{
          email,
        }}
        validationSchema={loginValidation}
        onSubmit={() => {
          twoFactorSetHandler();
        }}
      >
        {(form) => (
          <Form
            method='post'
            action='/api/auth/twofactorset'
            className='contact-form pt-10 '
          >
            <Input
              type='text'
              name='email'
              icon='email'
              placeholder='Email Address'
              onChange={handleChange}
              value={email}
            />

            <button
              type='submit'
              className='mt-4 border-0 border-red-600 bg-red-600 text-white hover:bg-gray-900 disabled:opacity-25'
            >
              Request Token
            </button>
          </Form>
        )}
      </Formik>

      <FormToasts fetching={fetching} error={error} success={success} />
    </div>
  );
}
