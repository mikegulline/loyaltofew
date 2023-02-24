export const mensMenu = [
  { name: 'Original Tee', location: '/store/mens/tee/arch/black' },
  { name: 'Original Tank', location: '/store/mens/tank/arch/black' },
  { name: 'Original Long-Sleeve', location: '/store/mens/sleeves/arch/black' },
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
  {
    name: 'Original 50/50 Crew',
    location: '/store/outerwear/50-50-crew/arch/black',
  },
  { name: 'Original Crew', location: '/store/outerwear/crew/arch/black' },
  {
    name: 'Original 50/50 Hoodie',
    location: '/store/outerwear/50-50-hoodie/arch/black',
  },
  { name: 'Premium Hoodie', location: '/store/outerwear/hoodie/arch/black' },
  { name: 'Knit Beanie', location: '/store/outerwear/beanie/block/black' },
  {
    name: 'Trucker Snapback',
    location: '/store/outerwear/snapback/block/black-white',
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

export const breadcrumbs = [['Welcome to Loyal to Few Clothing ~ Est. 2020']];

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
