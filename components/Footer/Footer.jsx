import styles from './Footer.module.css';
import Container from '../Container/Container';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Container>
        <p>&copy; {new Date().getFullYear()} Loyal To Few.</p>
      </Container>
    </div>
  );
};

export default Footer;
