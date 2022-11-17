import Link from 'next/link';
import styles from './Footer.module.css';
import Container from '../Container/Container';
import Menu from '../Menu/Menu';
import { mainMenu, categoryMenu } from '../../data/menu';

const Footer = () => {
  return (
    <div className={`footer ${styles.footer}`}>
      <Container className={styles.columns}>
        <Menu menuData={mainMenu} title='Site' className={styles.menu} />
        <Menu menuData={categoryMenu} title='Store' className={styles.menu} />
      </Container>
      <Copyright />
    </div>
  );
};

const Copyright = () => {
  return (
    <Container>
      <p className={styles.copy}>
        &copy; {new Date().getFullYear()} <Link href='/'>Loyal To Few</Link>. A
        Trademarked Way Of Life.
      </p>
    </Container>
  );
};

export default Footer;
