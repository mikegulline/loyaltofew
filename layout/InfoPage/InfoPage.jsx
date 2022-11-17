import Container from '../../components/Container/Container';
import styles from './InfoPage.module.css';

const InfoPage = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Container>{children}</Container>
    </div>
  );
};

export default InfoPage;
