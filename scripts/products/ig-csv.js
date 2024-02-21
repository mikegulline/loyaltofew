const path = require('path');
const fs = require('fs');
const store = require('./store');
const { kebab } = require('./models.js');

const getLink = (baseUrl, category, type, logo, color) =>
  `${baseUrl}store/${category}/${kebab(type)}/${kebab(logo)}/${kebab(
    color
  )}`.toLowerCase();

const getImageLink = (baseUrl, category, type, logo, color) =>
  `${baseUrl}images/products/${category}/${kebab(type)}/`.toLowerCase() +
  `${category}${type}${logo}${color}.jpg`.replace(/ /g, '');

const getTitle = (product, logo, color, size) =>
  `${product} With ${logo} (${color}) ${size}`;

const getGroupId = (category, type, logo, color) =>
  `${[category, type, color, logo].join(':').toLocaleLowerCase()}`.replace(
    / /g,
    '-'
  );

const getId = (category, type, logo, color, size) =>
  `${[category, type, color, logo, size]
    .join(':')
    .toLocaleLowerCase()}`.replace(/ /g, '-');

const getGender = (type) => {
  if (type === 'Mens' || type === 'Womens') return type.toLowerCase();
  return 'unisex';
};

const fileOutput = [];
const baseUrl = 'https://www.loyaltofew.com/';
store.map(({ name: category, products }) => {
  products.map(
    ({ product, type, weight, meta, logos, colors, colorsAlt, sizes }) => {
      logos.map((logo) => {
        colors.map((color) => {
          sizes.map(({ size, price, ...rest }) => {
            const { description } = meta;
            const item_group_id = getGroupId(category, type, logo, color);
            const id = getId(category, type, logo, color, size);
            const title = getTitle(product, logo, color, size);
            const link = getLink(baseUrl, category, type, logo, color);
            const image_link = getImageLink(
              baseUrl,
              category,
              type,
              logo,
              color
            );
            const gender = getGender(type);
            const build = {
              item_group_id,
              id,
              title,
              description: description.replace(/,/g, '&comma;'),
              availability: 'in stock',
              condition: 'new',
              price: `${price} USD`,
              link,
              image_link,
              brand: 'Loyal to Few®',
              quantity_to_sell_on_facebook: '1000',
              gender,
              color,
              size,
              age_group: 'adult',
              shipping_weight: weight,
            };
            if (rest?.colors && !rest.colors.includes(color)) {
              console.log('skip', id);
            } else if (
              colorsAlt &&
              colorsAlt[logo] &&
              !colorsAlt[logo].includes(color)
            ) {
              console.log('2nd skip', id);
            } else {
              fileOutput.push(build);
            }
          });
        });
      });
    }
  );
});

const csvKeys = Object.keys(fileOutput[0]).join(',') + '\n';

const filePath = path.join(__dirname, `../../public/csv/ig.csv`);

const fileOutputToString = fileOutput.reduce((acc, cur) => {
  return (acc += Object.values(cur).join(',') + '\n');
}, csvKeys);

fs.writeFileSync(filePath, fileOutputToString, 'utf8');
console.log('/public/csv/ig.csv done');
