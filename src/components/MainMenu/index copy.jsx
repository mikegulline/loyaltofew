import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SlBag, SlMenu, SlClose } from 'react-icons/sl';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import ResizeObserver from 'rc-resize-observer';
import { mainMenu } from '@/data/menu';
import Container from '@/components/Container';
import styles from './styles.module.css';

const MainMenu = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(0);
  const router = useRouter();

  const openCloseMobileMenu = (open) => {
    window.scrollTo(0, 0);
    if (open) {
      setOpenMobileMenu(1);
      disablePageScroll();
    } else {
      setOpenMobileMenu(0);
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
          onClick={() => openCloseMobileMenu(0)}
        >
          {name}
        </Link>
        {subMenu && !openMobileMenu && <SubMenu menuData={subMenu} />}
      </li>
    );
  });

  const withContainerShow = () => {
    if (openMobileMenu) {
      return (
        <Container>
          <div
            className={styles.mobile_menu_close}
            onClick={(e) => {
              openCloseMobileMenu(0);
            }}
          >
            <SlClose />
          </div>
          <ul className={styles.main_ul}>{buildMenu}</ul>
        </Container>
      );
    } else {
      return <ul className={styles.main_ul}>{buildMenu}</ul>;
    }
  };

  return (
    <>
      <div
        className={`${styles.menu_wrapper} ${
          openMobileMenu ? styles.menu_open : ''
        }`}
      >
        {withContainerShow()}
      </div>
      <div className={styles.mobile_menu_button}>
        <ResizeObserver
          onResize={({ width }) => {
            if (openMobileMenu && width === 0) openCloseMobileMenu(0);
          }}
        >
          <div
            className={styles.mobile_menu_open}
            onClick={(e) => {
              openCloseMobileMenu(1);
            }}
          >
            <SlMenu />
          </div>
        </ResizeObserver>
      </div>
      <AddToCartButton handleClick={() => openCloseMobileMenu(0)} />
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
