import { useState } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from './Input';

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
      // setTimeout(() => {
      //   router.push('/');
      // }, 2000);
    } catch (error) {
      setUser({ ...user, success: '', error: error.response.data.message });
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <div>Loading…</div>}
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
              type='text'
              name='invoice'
              placeholder='Order Invoice'
              onChange={handleChange}
              value={invoice}
            />
            <Input
              type='textarea'
              name='message'
              placeholder='Your message.'
              onChange={handleChange}
              value={message}
            />
            <button
              type='submit'
              className='mt-4 border-0 border-red-600 bg-red-600 text-white hover:bg-gray-900'
            >
              Send Message
            </button>
          </Form>
        )}
      </Formik>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
    </>
  );
};

export default ContactForm;
