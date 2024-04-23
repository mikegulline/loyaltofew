import { useState } from 'react';
import LogoSVG from '@/public/logos/ltf-logo.svg';
import Link from 'next/link';
import Container from '@/components/Container';
import MainMenu from '@/components/MainMenu';
import AdminMenu from '@/components/AdminMenu';
import MobileMenu from '@/features/MobileMenu';
import { SlBag, SlMenu, SlClose } from 'react-icons/sl';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import styles from './Header.module.css';

const Header = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

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

  return (
    <div
      className={`header border-b-4 border-red-600 bg-white ${styles.header}`}
      id='page-header'
    >
      <MobileMenu
        open={openMobileMenu}
        openCloseMobileMenu={openCloseMobileMenu}
      />
      <AdminMenu />
      <Container>
        <div className={`flex h-[85px] items-center gap-1 lg:h-[105px]`}>
          <Logo />
          <MainMenu
            open={openMobileMenu}
            openCloseMobileMenu={openCloseMobileMenu}
          />

          <AddToCartButton handleClick={() => openCloseMobileMenu(false)} />

          <OpenCloseMenu
            open={openMobileMenu}
            openCloseMobileMenu={openCloseMobileMenu}
          />
        </div>
      </Container>
    </div>
  );
};

const Logo = () => {
  return (
    <div className='relative flex-grow'>
      <Link href='/' className={styles.logo} prefetch={false}>
        <LogoSVG className='fill-gray-900 hover:fill-red-600' />
        <h1 role='heading' name='Loyal to Few' className={styles.h1}>
          Loyal To Few®
        </h1>
        <p className={styles.tagline}>A trademarked way of life.</p>
      </Link>
    </div>
  );
};

const AddToCartButton = ({ handleClick }) => {
  return (
    <div onClick={handleClick}>
      <a
        className='snipcart-checkout snipcart-summary relative  flex h-12 w-12 items-center justify-center gap-1 rounded bg-red-600 text-white hover:bg-gray-900 hover:text-white lg:h-auto lg:w-auto lg:rounded lg:px-4 lg:py-3'
        href='#'
      >
        <SlBag />
        <span className='snipcart-total-price hidden lg:block '>$0.00</span>
      </a>
    </div>
  );
};

const OpenCloseMenu = ({ open, openCloseMobileMenu }) => {
  const ShowButton = () =>
    !open ? (
      <div
        className={`z-10 flex h-12 w-12 cursor-pointer items-center justify-center gap-1 rounded bg-gray-300 text-gray-900 hover:bg-gray-900 hover:text-white lg:hidden`}
        onClick={(e) => {
          openCloseMobileMenu(true);
        }}
      >
        <SlMenu />
      </div>
    ) : (
      <div
        className={`z-10 flex h-12 w-12 cursor-pointer items-center justify-center gap-1 rounded bg-red-600 text-white  lg:hidden`}
        onClick={(e) => {
          openCloseMobileMenu(false);
        }}
      >
        <SlClose />
      </div>
    );
  return <ShowButton />;
};

export default Header;
