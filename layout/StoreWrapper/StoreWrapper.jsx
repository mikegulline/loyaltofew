import Container from '../../components/Container/Container';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import styles from './StoreWrapper.module.css';

const StoreWrapper = ({ title, children, breadcrumbs }) => {
  return (
    <>
      {breadcrumbs && <Breadcrumbs links={breadcrumbs} />}
      <div className={styles.wrapper}>
        <Container>
          <h1>{title}</h1>
          {children}
        </Container>
      </div>
    </>
  );
};

export default StoreWrapper;
