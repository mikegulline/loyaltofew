import Link from 'next/link';
import styles from './Footer.module.css';
import Container from '../Container';
import Menu from '../Menu';
import { footerSiteMenu, footerShopMenu } from '../../data/menu';

const Footer = () => {
  return (
    <>
      <div className={`footer ${styles.footer}`}>
        <Container className={styles.columns}>
          <Menu
            menuData={footerSiteMenu}
            title='Site'
            className={styles.menu}
          />
          <Menu
            menuData={footerShopMenu}
            title='Store'
            className={styles.menu}
          />
        </Container>
      </div>
      <Copyright />
    </>
  );
};

const Copyright = () => {
  return (
    <div className={`footer ${styles.copy}`}>
      <Container>
        <p className={styles.copyP}>
          &copy; {new Date().getFullYear()} <Link href='/'>Loyal To Few</Link>.
          A Trademarked Way Of Life.
        </p>
      </Container>
    </div>
  );
};

export default Footer;
