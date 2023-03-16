import { useSession } from 'next-auth/react';
import { adminSubMenu } from '../data/menu';
import Menu from './Menu';
import Container from './Container';

export default function AdminMenu({}) {
  const { data: session } = useSession();

  if (!session?.user?.name) {
    return <div className='h-0 bg-gray-800 text-white' />;
  }

  return (
    <div className='flex h-10 transform items-center overflow-hidden bg-gray-800 text-white duration-500'>
      <Container>
        <Menu menuData={adminSubMenu} className='adminSubMenu' />
      </Container>
    </div>
  );
}
