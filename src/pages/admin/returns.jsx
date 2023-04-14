import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { H1 } from '@/components/Type';
import Container from '@/components/Container';
import { ProcessReturn } from '@/features/ProcessReturn';

export default function Returns({ passReturns }) {
  const [returns, setReturns] = useState(passReturns);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);

  useEffect(() => {
    const getOrder = async () => {
      if (currentInvoice !== null) {
        try {
          const { data } = await axios.get(
            `/api/admin/order/${currentInvoice}`
          );
          if (data.order) {
            setOrder(data.order);
            console.log('update order');
          }
        } catch (error) {}
      }
    };
    getOrder();
  }, [currentInvoice]);

  const handleClose = (status) => {
    if (status && order.status !== status) {
      setReturns(
        returns.map((r, i) =>
          i === currentIndex ? { ...r, status: status } : r
        )
      );
    }
    setCurrentStatus(null);
    setCurrentIndex(null);
    setCurrentInvoice(null);
    setMessage(null);
    setOrder(null);
  };

  const Overlay = () =>
    currentInvoice !== null && order !== null ? (
      <ProcessReturn
        order={order}
        message={message}
        status={currentStatus}
        handleClose={handleClose}
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
          {returns?.map(
            ({ _id, name, email, invoiceNumber, message, status }, i) => {
              return (
                <li
                  key={_id}
                  className={`flex cursor-pointer items-center gap-4 rounded border p-4 hover:border-green-600 hover:bg-green-100`}
                  onClick={() => {
                    setCurrentIndex(i);
                    setCurrentInvoice(returns[i].invoiceNumber);
                    setMessage(message);
                    setCurrentStatus(status);
                  }}
                >
                  <div className='w-20'>
                    <strong>{invoiceNumber}</strong>
                  </div>
                  <div className={` w-40 truncate`}>{name}</div>
                  <div>{status}</div>
                  <div className={`flex grow justify-end`}>{email}</div>
                </li>
              );
            }
          )}
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
    return { props: { passReturns: data } };
  } catch (errors) {
    console.log({ message: 'Trouble getting returns', errors });
  }
  return { props: { passReturns: [] } };
}
