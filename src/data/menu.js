import { signOut } from 'next-auth/react';

export const mensMenu = [
  { name: '50/50 Tee', location: '/store/mens/tee/' },
  { name: 'Cotton Tank', location: '/store/mens/tank/' },
  // {
  //   name: 'Cotton Long-Sleeve',
  //   location: '/store/mens/sleeves/',
  // },
];

export const womensMenu = [
  // { name: 'Tee', location: '/store/womens/tee/arch/navy' },
  { name: 'Tri-Blend Tank', location: '/store/womens/tank/' },
  // { name: 'Crop', location: '/store/womens/crop/' },
  {
    name: 'Cotton Oversized Crop',
    location: '/store/womens/oversized-crop/',
  },
  { name: '50/50 Tee', location: '/store/mens/tee/' },
  // {
  //   name: 'Cotton Long-Sleeve',
  //   location: '/store/mens/sleeves/',
  // },
];

export const outerwearMenu = [
  {
    name: '50/50 Crew',
    location: '/store/outerwear/50-50-crew/',
  },
  {
    name: 'Cotton Crew',
    location: '/store/outerwear/crew/',
  },
  {
    name: '50/50 Hoodie',
    location: '/store/outerwear/50-50-hoodie/',
  },
  {
    name: 'Cotton Hoodie',
    location: '/store/outerwear/hoodie/',
  },
  { name: 'Knit Beanie', location: '/store/outerwear/beanie/' },
  {
    name: 'Flexfit Snapback',
    location: '/store/outerwear/flexfit-snapback/',
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
