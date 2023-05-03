import Container from '@/components/Container';

const ColumnLayout = ({ children }) => {
  return (
    <Container className='flex flex-col items-center xl:flex-row'>
      {children}
    </Container>
  );
};

export default ColumnLayout;
