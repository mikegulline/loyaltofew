import { getSession } from 'next-auth/react';
import Container from '../../../components/Container';

export default function Mail() {
  return (
    <Container size='xs' className='py-10'>
      <h1>Mail</h1>
      <p>list of mail</p>
    </Container>
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
  return { props: {} };
  // const { user } = session;

  // await db.connectDB();
  // const tournaments = await Tournament.find({
  //   admin: ObjectId(user._id),
  // }).populate('admin');
  // await db.disconnectDB();

  // return {
  //   props: {
  //     user,
  //     tournaments: JSON.parse(JSON.stringify(tournaments)),
  //   },
  // };
}
