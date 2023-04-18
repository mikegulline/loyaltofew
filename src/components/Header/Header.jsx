import LogoSVG from '@/public/logos/ltf-logo.svg';
import Link from '@/components/Link';
import Container from '@/components/Container';
import MainMenu from '@/components/MainMenu';
import AdminMenu from '@/components/AdminMenu';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div
      className={`header border-b-4 border-red-600 bg-white ${styles.header}`}
    >
      <AdminMenu />
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
        <LogoSVG className='fill-gray-900 hover:fill-red-600' />
        <h1 className={styles.h1}>Loyal To Few®</h1>
        <p className={styles.tagline}>A trademarked way of life.</p>
      </Link>
    </div>
  );
};

export default Header;
