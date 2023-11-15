import { signOut } from 'next-auth/react';

export const mensMenu = [
  { name: '50/50 Tee', location: '/store/mens/tee/arch/black' },
  { name: 'Cotton Tank', location: '/store/mens/tank/arch/black' },
  {
    name: 'Cotton Long-Sleeve',
    location: '/store/mens/sleeves/arch/black',
  },
];

export const womensMenu = [
  // { name: 'Tee', location: '/store/womens/tee/arch/navy' },
  { name: 'Tri-Blend Tank', location: '/store/womens/tank/arch/blue' },
  // { name: 'Crop', location: '/store/womens/crop/arch/black' },
  {
    name: 'Cotton Oversized Crop',
    location: '/store/womens/oversized-crop/arch/black',
  },
  { name: '50/50 Tee', location: '/store/mens/tee/arch/black' },
  {
    name: 'Cotton Long-Sleeve',
    location: '/store/mens/sleeves/arch/black',
  },
];

export const outerwearMenu = [
  {
    name: '50/50 Crew',
    location: '/store/outerwear/50-50-crew/arch/black',
  },
  {
    name: 'Cotton Crew',
    location: '/store/outerwear/crew/arch/black',
  },
  {
    name: '50/50 Hoodie',
    location: '/store/outerwear/50-50-hoodie/arch/black',
  },
  {
    name: 'Cotton Hoodie',
    location: '/store/outerwear/hoodie/arch/black',
  },
  { name: 'Knit Beanie', location: '/store/outerwear/beanie/block/black' },
  {
    name: 'Flexfit Snapback',
    location: '/store/outerwear/flexfit-snapback/block/black-white',
  },
];

export const mainMenu = [
  // { name: 'Home', location: '/' },
  { name: 'Mens', location: '/store/mens', subMenu: mensMenu },
  { name: 'Womens', location: '/store/womens', subMenu: womensMenu },
  { name: 'Outerwear', location: '/store/outerwear', subMenu: outerwearMenu },
  { name: 'Our Story', location: '/our-story' },
  { name: 'Contact', location: '/contact' },
  { name: 'Orders', location: '/orders' },
];

export const adminSubMenu = [
  { name: 'Orders', location: '/admin/orders' },
  { name: 'Returns', location: '/admin/returns' },
  {
    name: 'Logout',
    location: '',
    onClick: (e) => {
      e.preventDefault();
      signOut();
    },
  },
];

export const adminMenu = {
  name: 'Admin',
  location: '/admin',
  subMenu: adminSubMenu,
};

export const breadcrumbs = [['Welcome to Loyal to Few® Clothing ~ Est. 2020']];

// footer menus

export const footerShopMenu = [
  { name: 'Shop All', location: '/store' },
  { name: 'Mens', location: '/store/mens' },
  { name: 'Womens', location: '/store/womens' },
  { name: 'Outerwear', location: '/store/outerwear' },
];

export const footerSiteMenu = [
  { name: 'Home', location: '/' },
  { name: 'Our Story', location: '/our-story' },
  { name: 'Contact', location: '/contact' },
  { name: 'Orders', location: '/orders' },
];

// export const footerSiteMenu = [
//   { name: 'Home', location: '/' },
//   { name: 'Store', location: '/store', subMenu: footerShopMenu },
//   { name: 'About', location: '/about' },
//   { name: 'Contact', location: '/contact' },
//   { name: 'Orders', location: '/returns' },
// ];
