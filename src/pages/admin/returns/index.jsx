import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { H1 } from '@/components/Type';
import Container from '@/components/Container';
import { ProcessReturn } from '@/features/ProcessReturn';

export default function Mail({ mail }) {
  const [current, setCurrent] = useState(null);
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const getOrder = async () => {
      if (current !== null) {
        try {
          const { data } = await axios.get(
            `/api/admin/order/${mail[current].invoice}`
          );
          if (data.order) {
            setOrder(data.order);
            console.log('update order');
          }
        } catch (error) {}
      }
    };
    getOrder();
  }, [current, mail]);

  const handleNextClose = (next) => {
    if (!next) {
      setCurrent(null);
      setMessage(null);
      setOrder(null);
    } else setCurrent((c) => Number(c + next));
  };

  const Overlay = () =>
    current !== null && order !== null ? (
      // <MailProcessOverlay
      //   mail={mail[current]}
      //   handleNextClose={handleNextClose}
      // />
      <ProcessReturn
        order={order}
        message={message}
        nextClose={handleNextClose}
      />
    ) : null;

  return (
    <>
      <Overlay />
      <Container size='xs' className='py-10'>
        <H1 className={`text-gray-800`}>Returns</H1>
        <ul
          className={`my-6 flex flex-col gap-1 border-y-4 border-red-600 border-b-gray-500 py-6`}
        >
          {mail?.map(({ _id, name, email, invoice, message, status }, i) => {
            return (
              <li
                key={_id}
                className={`flex cursor-pointer items-center gap-4 rounded border p-4 hover:border-green-600 hover:bg-green-100`}
                onClick={() => {
                  setCurrent(i);
                  setMessage(message);
                }}
              >
                <div className='w-20'>
                  <strong>{invoice}</strong>
                </div>
                <div className={` w-40 truncate`}>{name}</div>
                <div>{status}</div>
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
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/returns`
    );
    return { props: { mail: data } };
  } catch (errors) {
    console.log({ message: 'Trouble getting returns', errors });
  }
  return { props: { mail: [] } };
}
