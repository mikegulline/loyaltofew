import { ErrorMessage, useField } from 'formik';

export default function Input({ ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className='mb-2'>
      {props.type === 'textarea' ? (
        <textarea {...field} {...props}></textarea>
      ) : (
        <input {...field} {...props} />
      )}
      {meta.touched && meta.error ? (
        <div className='mt-1 mb-4 rounded border border-red-600 bg-red-50 px-5 py-2 text-red-900'>
          <ErrorMessage name={field.name} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
