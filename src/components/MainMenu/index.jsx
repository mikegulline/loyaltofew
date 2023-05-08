import Link from 'next/link';
import { mainMenu } from '@/data/menu';
import styles from './styles.module.css';

const MainMenu = ({ openCloseMobileMenu }) => {
  const buildMenu = mainMenu.map(({ name, location, subMenu }) => {
    return (
      <li key={name} className={styles.main_li}>
        <Link
          href={location}
          className={styles.main_link}
          prefetch={false}
          onClick={() => openCloseMobileMenu(false)}
        >
          {name}
        </Link>
        {subMenu && <SubMenu menuData={subMenu} />}
      </li>
    );
  });

  return (
    <div className={`${styles.menu_wrapper}`}>
      <ul className={styles.main_ul}>{buildMenu}</ul>
    </div>
  );
};

const SubMenu = ({ menuData }) => {
  const buildMenu = menuData.map(({ name, location, onClick = () => {} }) => {
    return (
      <li key={name} className={styles.sub_li}>
        <Link
          href={location}
          prefetch={false}
          className={styles.sub_link}
          onClick={onClick}
        >
          {name}
        </Link>
      </li>
    );
  });

  return (
    <div className={styles.sub_menu_wrapper}>
      <ul className={styles.sub_ul}>{buildMenu}</ul>
    </div>
  );
};

export default MainMenu;
