import Container from '../../components/Container/Container';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { breadcrumbs } from '../../data/menu';
import styles from './InfoPage.module.css';

const InfoPage = ({ children }) => {
  return (
    <>
      <Breadcrumbs links={breadcrumbs} />
      <div className={styles.wrapper}>
        <Container size='xs'>{children}</Container>
      </div>
    </>
  );
};

export default InfoPage;
