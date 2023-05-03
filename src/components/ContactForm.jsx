import { useState } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/Input';
import FormToasts from '@/components/FormToasts';

const initialValues = {
  name: '',
  email: '',
  invoice: '',
  message: '',
  error: '',
  success: '',
};

const ContactForm = () => {
  const [fetching, setFetching] = useState(null);
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
      setFetching('Sending message…');
      const { data } = await axios.post('/api/admin/returns', {
        name,
        email,
        invoice,
        message,
      });
      setMail({ ...initialValues, success: data.message });

      setFetching(null);

      setTimeout(() => {
        setMail(initialValues);
      }, 6000);
    } catch (error) {
      setMail({ ...mail, success: '', error: error.response.data.message });
      setFetching(null);
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
              disabled={fetching}
              type='text'
              name='name'
              placeholder='Name'
              onChange={handleChange}
              value={name}
              className=' disabled:opacity-25'
            />
            <Input
              disabled={fetching}
              type='text'
              name='email'
              placeholder='Email Address'
              onChange={handleChange}
              value={email}
              className=' disabled:opacity-25'
            />
            <Input
              disabled={fetching}
              type='text'
              name='invoice'
              placeholder='Invoice Number'
              onChange={handleChange}
              value={invoice}
              className=' disabled:opacity-25'
            />
            <Input
              disabled={fetching}
              type='textarea'
              name='message'
              placeholder='Your message.'
              onChange={handleChange}
              value={message}
              className=' whitespace-pre-line disabled:opacity-25'
            />
            <button
              disabled={fetching}
              type='submit'
              className='mt-4 border-0 border-red-600 bg-red-600 text-white hover:bg-gray-900 disabled:opacity-25'
            >
              Send Message
            </button>
          </Form>
        )}
      </Formik>
      <FormToasts fetching={fetching} error={error} success={success} />
    </>
  );
};

export default ContactForm;
