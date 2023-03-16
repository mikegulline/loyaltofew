import { useState } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from './Input';
import { SlRefresh, SlCheck } from 'react-icons/sl';

const initialValues = {
  name: '',
  email: '',
  invoice: '',
  message: '',
  error: '',
  success: '',
};

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [mail, setMail] = useState(initialValues);
  const { name, email, invoice, message, error, success } = mail;

  const handleChange = (e) =>
    setMail({ ...mail, [e.target.name]: e.target.value });

  const mailValidation = Yup.object({
    name: Yup.string()
      .required('Please enter your name.')
      .min(3, 'Name must be between 3 and 26 characters.')
      .max(26, 'Name must be between 3 and 26 characters.'),
    email: Yup.string()
      .required('Email address is required.')
      .email('Please enter a valid email.'),
    invoice: Yup.string()
      .min(7, 'Your invoice is 7 characters long and starts with LTF.')
      .max(7, 'Your invoice is 7 characters long and starts with LTF.'),
    message: Yup.string().required('Please enter a message.'),
  });

  const sendMailHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/admin/mail', {
        name,
        email,
        invoice,
        message,
      });
      setMail({ ...initialValues, success: data.message });

      setLoading(false);

      setTimeout(() => {
        setMail(initialValues);
      }, 10000);
    } catch (error) {
      setMail({ ...mail, success: '', error: error.response.data.message });
      setLoading(false);
    }
  };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          name,
          email,
          invoice,
          message,
        }}
        validationSchema={mailValidation}
        onSubmit={() => {
          sendMailHandler();
        }}
      >
        {(form) => (
          <Form className='contact-form pt-10'>
            <Input
              disabled={loading}
              type='text'
              name='name'
              placeholder='Name'
              onChange={handleChange}
              value={name}
              className=' disabled:opacity-25'
            />
            <Input
              disabled={loading}
              type='text'
              name='email'
              placeholder='Email Address'
              onChange={handleChange}
              value={email}
              className=' disabled:opacity-25'
            />
            <Input
              disabled={loading}
              type='text'
              name='invoice'
              placeholder='Invoice Number'
              onChange={handleChange}
              value={invoice}
              className=' disabled:opacity-25'
            />
            <Input
              disabled={loading}
              type='textarea'
              name='message'
              placeholder='Your message.'
              onChange={handleChange}
              value={message}
              className=' disabled:opacity-25'
            />
            <button
              disabled={loading}
              type='submit'
              className='mt-4 border-0 border-red-600 bg-red-600 text-white hover:bg-gray-900 disabled:opacity-25'
            >
              Send Message
            </button>
          </Form>
        )}
      </Formik>
      <div
        className={`relative overflow-hidden transition-all duration-500 ${
          error || success || loading ? ' h-32' : 'h-0 delay-500'
        }`}
      >
        <div
          className={` absolute mt-5 mb-4 w-full rounded border border-red-600 bg-red-50 px-5 py-2 text-red-900 transition-all duration-500 ${
            error
              ? ' translate-y-0  opacity-100  delay-500'
              : ' translate-y-10  opacity-0'
          }`}
        >
          {error}
          <span>&nbsp;</span>
        </div>
        <div
          className={` absolute mt-5 mb-4 flex w-full items-center gap-2 rounded border border-green-600 bg-green-50 px-5 py-2 text-green-900 transition-all duration-500 ${
            success
              ? ' translate-y-0  opacity-100  delay-500'
              : ' translate-y-10  opacity-0'
          }`}
        >
          <SlCheck />
          {success}
          <span>&nbsp;</span>
        </div>
        <div
          className={` absolute mt-5 mb-4  flex w-full items-center gap-2 rounded border border-gray-600 bg-gray-50 px-5 py-2 text-gray-900 transition-all duration-500 ${
            loading
              ? ' translate-y-0  opacity-100'
              : ' translate-y-10  opacity-0'
          }`}
        >
          <div className='animate-spin'>
            <SlRefresh className='-scale-x-100' />
          </div>{' '}
          Sending Mail
        </div>
      </div>
    </>
  );
};

export default ContactForm;
