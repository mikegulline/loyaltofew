import Link from '../Link';
import Container from '../Container';
import Menu from '../Menu';
import styles from './Header.module.css';
import LogoSVG from '../../public/logos/ltf-logo.svg';
import { mainMenu } from '../../data/menu';
import { IoCartOutline } from 'react-icons/io5';

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
    <div className='menuRight'>
      <a className='snipcart-checkout snipcart-summary ' href='#'>
        <IoCartOutline />
        <span className='snipcart-total-price'>$0.00</span>
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
