import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SlBag, SlMenu, SlClose } from 'react-icons/sl';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import ResizeObserver from 'rc-resize-observer';
import { mainMenu } from '@/data/menu';
import MobileMenu from '@/features/MobileMenu';
import Container from '@/components/Container';
import styles from './styles.module.css';

const MainMenu = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const router = useRouter();

  const openCloseMobileMenu = (open) => {
    window.scrollTo(0, 0);
    if (open) {
      setOpenMobileMenu(true);
      disablePageScroll();
    } else {
      setOpenMobileMenu(false);
      enablePageScroll();
    }
  };

  const buildMenu = mainMenu.map(({ name, location, subMenu }) => {
    const active_class = `${styles.main_li} ${
      router.asPath == location ? styles.main_active : ''
    }`;
    return (
      <li key={name} className={active_class}>
        <Link
          href={location}
          className={styles.main_link}
          onClick={() => openCloseMobileMenu(false)}
        >
          {name}
        </Link>
        {subMenu && <SubMenu menuData={subMenu} />}
      </li>
    );
  });

  return (
    <>
      <MobileMenu
        open={openMobileMenu}
        onClick={() => openCloseMobileMenu(false)}
      />
      <div className={`${styles.menu_wrapper}`}>
        <ul className={styles.main_ul}>{buildMenu}</ul>
      </div>
      <AddToCartButton handleClick={() => openCloseMobileMenu(false)} />
      <div className={styles.mobile_menu_button}>
        {!openMobileMenu ? (
          <div
            className={styles.mobile_menu_open}
            onClick={(e) => {
              openCloseMobileMenu(true);
            }}
          >
            <SlMenu />
          </div>
        ) : (
          <ResizeObserver
            onResize={({ width }) => {
              if (openMobileMenu && width === 0) openCloseMobileMenu(false);
            }}
          >
            <div
              className={styles.mobile_menu_close}
              onClick={(e) => {
                openCloseMobileMenu(false);
              }}
            >
              <SlClose />
            </div>
          </ResizeObserver>
        )}
      </div>
    </>
  );
};

const SubMenu = ({ menuData }) => {
  const router = useRouter();

  const buildMenu = menuData.map(({ name, location, onClick = () => {} }) => {
    const active_class = `${styles.sub_li} ${
      router.asPath == location ? styles.sub_active : ''
    }`;
    return (
      <li key={name} className={active_class}>
        <Link href={location} className={styles.sub_link} onClick={onClick}>
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
