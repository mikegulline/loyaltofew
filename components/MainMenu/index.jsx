import { useState } from 'react';
import Link from '../Link';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import { SlBag, SlMenu, SlClose } from 'react-icons/sl';

const MainMenu = ({ menuData }) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(0);
  const router = useRouter();

  const buildMenu = menuData.map(({ name, location, subMenu }) => {
    const active_class = `${styles.main_li} ${
      router.asPath == location ? styles.main_active : ''
    }`;
    return (
      <li key={name} className={active_class}>
        <Link href={location} className={styles.main_link}>
          {name}
        </Link>
        {subMenu && <SubMenu menuData={subMenu} />}
      </li>
    );
  });

  return (
    <>
      <div
        onClick={() => setOpenMobileMenu(0)}
        className={`${styles.menu_wrapper} ${
          openMobileMenu ? styles.menu_open : ''
        }`}
      >
        <div className={styles.menu_close}>
          <SlClose />
        </div>
        <ul className={styles.main_ul}>{buildMenu}</ul>
      </div>
      <div className={styles.mobile_menu_button}>
        <button onClick={() => setOpenMobileMenu(1)}>
          <SlMenu />
        </button>
      </div>
      <AddToCartButton />
    </>
  );
};

const SubMenu = ({ menuData }) => {
  const router = useRouter();

  const buildMenu = menuData.map(({ name, location }) => {
    const active_class = `${styles.sub_li} ${
      router.asPath == location ? styles.sub_active : ''
    }`;
    return (
      <li key={name} className={active_class}>
        <Link href={location} className={styles.sub_link}>
          {name}
        </Link>
      </li>
    );
  });

  return <ul className={styles.sub_ul}>{buildMenu}</ul>;
};

const AddToCartButton = () => {
  return (
    <div className={styles.add_to_cart_button}>
      <a className='snipcart-checkout snipcart-summary' href='#'>
        <SlBag />
        <span className='snipcart-total-price'>$0.00</span>
      </a>
    </div>
  );
};

export default MainMenu;
