import Link from 'next/link';
import Container from '../Container/Container';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <Container>
        <Link href='/store'>
          <h1 className={styles.logo}>Loyal To Few</h1>
        </Link>
        <p className={styles.tagline}>A trademarked way of life.</p>
      </Container>
    </div>
  );
};

export default Header;
