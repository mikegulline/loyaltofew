import Container from '../../components/Container/Container';
import Breadcrumbs from '../../components/Breadcrumbs';
import { breadcrumbs } from '../../data/menu';

const InfoPage = ({ children }) => {
  return (
    <>
      <Breadcrumbs links={breadcrumbs} />
      <div className='py-7 lg:py-14'>
        <Container size='xs'>{children}</Container>
      </div>
    </>
  );
};

export default InfoPage;
