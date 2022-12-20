import Container from '../../components/Container';
import Breadcrumbs from '../../components/Breadcrumbs';
import { breadcrumbs } from '../../data/menu';

const InfoPage = ({ children }) => {
  return (
    <>
      <Breadcrumbs links={breadcrumbs} />
      <div className='wrapper pb-5 lg:pb-14'>
        <Container size='xs'>{children}</Container>
      </div>
    </>
  );
};

export default InfoPage;
