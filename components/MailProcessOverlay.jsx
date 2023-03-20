import Buttons from './OrderProcessButtons';
import { H1 } from './Type';

export default function MailProcessOverlay({
  mail,
  handleNextClose = () => {},
}) {
  const { _id, name, email, invoice, status, message } = mail;
  // const date = new Date(creationDate);
  console.log('here');
  const Header = () => {
    return (
      <div className='mb-10  border-b-4 border-red-600 pb-6'>
        <H1 className='mb-4 flex items-center gap-1 '>
          <span className='flex-1'>{name}</span>
          <Buttons.Close handleClose={handleNextClose} />
        </H1>
      </div>
    );
  };

  const Wrapper = ({ children }) => (
    <div className=' fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-gray-100 '>
      <div
        className='w-full max-w-screen-lg rounded-md bg-white p-10 drop-shadow-2xl'
        key={_id}
      >
        {children}
      </div>
    </div>
  );

  return (
    <Wrapper>
      <Header />
      <p>{email}</p>
      <p>{invoice}</p>
      <p>{status}</p>
      <p>{message}</p>
      <div></div>
    </Wrapper>
  );
}