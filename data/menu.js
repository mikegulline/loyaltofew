export const categoryMenu = [
  { name: 'Categories', location: '/store' },
  { name: "Men's", location: '/store/mens' },
  { name: "Woman's", location: '/store/womens' },
  { name: 'Outerwear', location: '/store/outerwear' },
  {
    name: 'Hats',
    location: '/store/hats',
    subMenu: [
      {
        name: 'Knit Beanie',
        location: '/store/hats/beanies',
      },
      {
        name: 'Trucker Snapback',
        location: '/store/hats/snapback',
      },
    ],
  },
];

export const mainMenu = [
  { name: 'Home', location: '/' },
  { name: 'Store', location: '/store', subMenu: categoryMenu },
  { name: 'About', location: '/about' },
  { name: 'Contact', location: '/contact' },
  { name: 'Returns', location: '/returns' },
];
