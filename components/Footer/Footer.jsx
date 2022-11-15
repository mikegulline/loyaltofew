import Link from 'next/link';
import styles from './Footer.module.css';
import Container from '../Container/Container';
import Menu from '../Menu/Menu';
import { mainMenu, categoryMenu } from '../../data/menu';

const Footer = () => {
  return (
    <div className={`footer ${styles.footer}`}>
      <Container>
        <div className={styles.columns}>
          <Menu menuData={mainMenu} title='Site' className={styles.menu} />
          <Menu menuData={categoryMenu} title='Store' className={styles.menu} />
        </div>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} <Link href='/'>Loyal To Few</Link>.
          A Trademarked Way Of Life.
        </p>
      </Container>
    </div>
  );
};

export default Footer;
