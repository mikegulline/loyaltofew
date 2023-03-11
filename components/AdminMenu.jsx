import { useSession } from 'next-auth/react';
import { adminSubMenu } from '../data/menu';
import Menu from './Menu';
import Container from './Container';

export default function AdminMenu({}) {
  const { data: session } = useSession();

  if (!session?.user?.name) {
    return <></>;
  }

  return (
    <div className='bg-gray-800 text-white'>
      <Container>
        <Menu menuData={adminSubMenu} className='adminSubMenu' />
      </Container>
    </div>
  );
}
