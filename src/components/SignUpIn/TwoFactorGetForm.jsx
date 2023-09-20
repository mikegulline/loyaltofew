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
  token: '',
  success: '',
  error: '',
};

export default function TwoFactorSetForm({ next }) {
  const [fetching, setFetching] = useState('');
  const [user, setUser] = useState(initialValuesTwoFactor);
  const { token, success, error } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const twoFactorSetHandler = async () => {
    setFetching('Getting secure token…');
    let options = {
      redirect: false,
      token: token,
    };
    // hit api
    const response = await fetch('/api/auth/twofactorget', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
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
          success: 'Loading Signin from…',
          error: '',
        });
      }, 2000);
      setTimeout(() => {
        setUser({ ...user, success: '', error: '' });
      }, 4000);
      setTimeout(() => {
        next();
      }, 5000);
    }
  };

  const loginValidation = Yup.object({
    token: Yup.string().required('Token is required.').length(5),
  });

  return (
    <div>
      <H1>Validate</H1>
      <Formik
        enableReinitialize
        initialValues={{
          token,
        }}
        validationSchema={loginValidation}
        onSubmit={() => {
          twoFactorSetHandler();
        }}
      >
        {(form) => (
          <Form
            method='post'
            action='/api/auth/twofactorget'
            className='contact-form pt-10 '
          >
            <Input
              type='text'
              name='token'
              icon='token'
              placeholder='Secure Token'
              onChange={handleChange}
              value={token}
            />

            <button
              type='submit'
              className='mt-4 border-0 border-red-600 bg-red-600 text-white hover:bg-gray-900 disabled:opacity-25'
            >
              Validate Token
            </button>
          </Form>
        )}
      </Formik>

      <FormToasts fetching={fetching} error={error} success={success} />
    </div>
  );
}
