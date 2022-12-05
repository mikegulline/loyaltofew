import Link from 'next/link';
import Container from '../Container/Container';
import Menu from '../Menu/Menu';
import styles from './Header.module.css';
import LogoSVG from '../../public/logos/ltf-logo.svg';
import { mainMenu } from '../../data/menu';

const Header = () => {
  return (
    <div className={`header ${styles.header}`}>
      <Container>
        <div className={styles.columns}>
          <Logo />
          <Menu
            menuData={mainMenu}
            className={styles.menu}
            activeClass={styles.active}
          />
          <MenuRight />
        </div>
      </Container>
    </div>
  );
};

const MenuRight = () => {
  return (
    <div className={styles.menuRight}>
      <a className='snipcart-checkout snipcart-summary' href='#'>
        <span className='snipcart-total-price'></span>
      </a>
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
