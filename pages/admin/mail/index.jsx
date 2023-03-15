import { useState } from 'react';
import { getSession } from 'next-auth/react';
import { H1 } from '../../../components/Type';
import Container from '../../../components/Container';
import axios from 'axios';
import MailProcessOverlay from '../../../components/MailProcessOverlay';

export default function Mail({ mail }) {
  const [current, setCurrent] = useState(null);

  const handleNextClose = (next) => {
    console.log('next', next);
    if (!next) setCurrent(null);
    else setCurrent((c) => Number(c + next));
  };

  const Overlay = () =>
    current != null ? (
      <MailProcessOverlay
        mail={mail[current]}
        handleNextClose={handleNextClose}
      />
    ) : null;

  return (
    <>
      <Overlay />
      <Container size='xs' className='py-10'>
        <H1 className={`text-gray-800`}>Mail</H1>
        <ul
          className={`my-6 flex flex-col gap-1 border-y-4 border-red-600 border-b-gray-500 py-6`}
        >
          {mail?.map(({ _id, name, email, invoice, message }, i) => {
            return (
              <li
                key={_id}
                className={`flex cursor-pointer items-center gap-4 rounded border p-4 hover:border-green-600 hover:bg-green-100`}
                onClick={() => {
                  setCurrent(i);
                }}
              >
                <div className={` w-40 truncate`}>{name}</div>
                <div>{invoice}</div>
                <div className={`flex grow justify-end`}>{email}</div>
              </li>
            );
          })}
        </ul>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/mail`
      // {
      //   params: {
      //     status: 'pending',
      //     limit: 5,
      //     offset: 0,
      //   },
      // }
    );
    return { props: { mail: data } };
  } catch (errors) {
    console.log({ message: 'Trouble getting mail', errors });
  }
  return { props: { mail: [] } };
}
