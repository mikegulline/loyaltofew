import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import { SlBag, SlMenu, SlClose } from 'react-icons/sl';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import ResizeObserver from 'rc-resize-observer';

const MainMenu = ({ menuData }) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (openMobileMenu) {
      disablePageScroll();
    } else {
      enablePageScroll();
    }
  }, [openMobileMenu]);

  const buildMenu = menuData.map(({ name, location, subMenu }) => {
    const active_class = `${styles.main_li} ${
      router.asPath == location ? styles.main_active : ''
    }`;
    return (
      <li key={name} className={active_class}>
        <Link
          href={location}
          className={styles.main_link}
          onClick={() => setOpenMobileMenu(0)}
        >
          {name}
        </Link>
        {subMenu && <SubMenu menuData={subMenu} />}
      </li>
    );
  });

  return (
    <>
      <div
        className={`${styles.menu_wrapper} ${
          openMobileMenu ? styles.menu_open : ''
        }`}
      >
        <ul className={styles.main_ul}>{buildMenu}</ul>
      </div>
      <div className={styles.mobile_menu_button}>
        <ResizeObserver
          onResize={({ width }) => {
            if (openMobileMenu && width === 0) setOpenMobileMenu(0);
          }}
        >
          <div
            className={styles.mobile_menu_close}
            onClick={(e) => {
              setOpenMobileMenu((open) => !open);
              e.preventDefault();
            }}
          >
            {openMobileMenu ? <SlClose /> : <SlMenu />}
          </div>
        </ResizeObserver>
      </div>
      <AddToCartButton handleClick={() => setOpenMobileMenu(0)} />
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

  return (
    <div className={styles.sub_menu_wrapper}>
      <ul className={styles.sub_ul}>{buildMenu}</ul>
    </div>
  );
};

const AddToCartButton = ({ handleClick }) => {
  return (
    <div className={styles.add_to_cart_button} onClick={handleClick}>
      <a className='snipcart-checkout snipcart-summary' href='#'>
        <SlBag />
        <span className='snipcart-total-price'>$0.00</span>
      </a>
    </div>
  );
};

export default MainMenu;
