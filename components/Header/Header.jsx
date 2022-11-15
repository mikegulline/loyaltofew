import Link from 'next/link';
import Container from '../Container/Container';
import Menu from '../Menu/Menu';
import styles from './Header.module.css';
import LogoSVG from '../../public/logos/ltf-horizontal.svg';
import { mainMenu } from '../../data/menu';

const Header = () => {
  return (
    <div className={`header ${styles.header}`}>
      <Container>
        <div className={styles.columns}>
          <Logo />
          <Menu menuData={mainMenu} className={styles.menu} />
          <MenuRight />
        </div>
      </Container>
    </div>
  );
};

const MenuRight = () => {
  return (
    <div className={styles.menuRight}>
      <Link href='/newsletter'>Join The Few</Link>
    </div>
  );
};

const Logo = () => {
  return (
    <div>
      <div className={styles.logo}>
        <Link href='/'>
          <LogoSVG />
          <h1 className={styles.h1}>Loyal To Few</h1>
          <p className={styles.tagline}>A trademarked way of life.</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
