import Link from '../Link';
import Container from '../Container';
import MainMenu from '../MainMenu';
import styles from './Header.module.css';
import LogoSVG from '../../public/logos/ltf-logo.svg';

const Header = () => {
  return (
    <div className={`header ${styles.header}`}>
      <Container>
        <div className={styles.columns}>
          <Logo />
          <MainMenu />
        </div>
      </Container>
    </div>
  );
};

const Logo = () => {
  return (
    <div>
      <Link href='/' className={styles.logo}>
        <LogoSVG />
        <h1 className={styles.h1}>Loyal To Few</h1>
        <p className={styles.tagline}>A trademarked way of life.</p>
      </Link>
    </div>
  );
};

export default Header;
