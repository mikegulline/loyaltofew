import Container from '@/components/Container';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function StoreWrapper({ title, children, breadcrumbs }) {
  return (
    <>
      <Breadcrumbs links={breadcrumbs} />
      <Container>
        <h1 className='mb-8 mt-8 text-6xl font-black text-gray-900 md:text-7xl'>
          {title}
        </h1>
        {children}
      </Container>
    </>
  );
}
