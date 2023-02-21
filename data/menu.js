export const mensMenu = [
  { name: 'Original Tee', location: '/store/mens/tee/arch/black' },
  { name: 'Original Tank', location: '/store/mens/tank/arch/black' },
  { name: 'Original Long-Sleeve', location: '/store/mens/sleeves/arch/black' },
  { name: 'Original Crew', location: '/store/mens/crew/arch/black' },
];

export const womensMenu = [
  { name: 'Original Tee', location: '/store/womens/tee/arch/navy' },
  { name: 'Original Tank', location: '/store/womens/tank/arch/blue' },
  { name: 'Original Crop', location: '/store/womens/crop/arch/black' },
  {
    name: 'Original Oversized Crop',
    location: '/store/womens/oversized-crop/arch/black',
  },
];

export const outerwearMenu = [
  { name: 'Premium Hoodie', location: '/store/outerwear/hoodie/arch/black' },
  { name: 'Knit Beanie', location: '/store/outerwear/beanie/block/black' },
  {
    name: 'Trucker Snapback',
    location: '/store/outerwear/snapback/block/black',
  },
];

export const mainMenu = [
  // { name: 'Home', location: '/' },
  { name: 'Mens', location: '/store/mens', subMenu: mensMenu },
  { name: 'Womens', location: '/store/womens', subMenu: womensMenu },
  { name: 'Outerwear', location: '/store/outerwear', subMenu: outerwearMenu },
  { name: 'About', location: '/about' },
  { name: 'Contact', location: '/contact' },
  { name: 'Orders', location: '/orders' },
];

export const breadcrumbs = [
  ['Store', '/store'],
  ['About', '/about'],
  ['Contact', '/contact'],
  ['Orders', '/orders'],
];

// footer menus

export const footerShopMenu = [
  { name: 'Shop All', location: '/store' },
  { name: 'Mens', location: '/store/mens' },
  { name: 'Womens', location: '/store/womens' },
  { name: 'Outerwear', location: '/store/outerwear' },
];

export const footerSiteMenu = [
  { name: 'Home', location: '/' },
  { name: 'About', location: '/about' },
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
