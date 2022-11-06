import { store } from './store';

export const getStore = () => processCategory();

export const processCategory = () =>
  store.map((category) => modalCategory(category));

const modalCategory = (values) => {
  const { category, products } = values;
  const link = `/products/${category}`.toLowerCase();
  return {
    category,
    link,
    products: processProducts(category, products),
  };
};

const processProducts = (category, products) =>
  products.map((product) => modalProduct({ ...product, category }));

const modalProduct = (values) => {
  const { category, type, logo, color: colors, size: sizes } = values;
  const link = `/products/${category}/${type}`.toLowerCase();
  const imageSlug = `${category}${type}${rand(logo)}${rand(colors)}`.replace(
    ' ',
    ''
  );
  const image = `/images/products/${category.toLowerCase()}/${type.toLowerCase()}/${imageSlug}.jpg`;
  return {
    type,
    link,
    image,
    logos: processLogos(logo, category, type, colors, sizes),
  };
};

const processLogos = (logos, category, type, colors, sizes) =>
  logos.map((logo) =>
    modalLogo({ logos, logo, category, type, colors, sizes })
  );

const modalLogo = (values) => {
  const { logo, category, type, colors } = values;
  const link = `/products/${category}/${type}/${logo}`.toLowerCase();
  const imageSlug = `${category}${type}${logo}${rand(colors)}`.replace(' ', '');
  const image = `/images/products/${category.toLowerCase()}/${type.toLowerCase()}/${imageSlug}.jpg`;
  const name = `${category} ${logo} Logo ${type}`;
  return {
    logo,
    name,
    link,
    image,
    colors: processColors(values),
  };
};

const processColors = (values) => {
  const { colors } = values;
  return colors.map((color) => modalColor({ ...values, color }));
};
const modalColor = (values) => {
  const { logo, category, type, color, colors, sizes } = values;
  const link = `/products/${category}/${type}/${logo}/${color}`.toLowerCase();
  const imageSlug = `${category}${type}${logo}${color}`.replace(' ', '');
  const image = `/images/products/${category.toLowerCase()}/${type.toLowerCase()}/${imageSlug}.jpg`;
  const name = `${category} ${logo} Logo ${type} (${color})`;
  const sku = imageSlug.toLowerCase();
  return { color, name, sku, link, image, colors, sizes };
};

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

export const getCategory = (useCategory) =>
  getStore().find(
    ({ category }) => category.toLowerCase() === useCategory.toLowerCase()
  );
export const getType = (useCategory, useType) =>
  getCategory(useCategory)['products'].find(
    ({ type }) => type.toLowerCase() === useType.toLowerCase()
  );

export const getLogo = (useCategory, useType, useLogo) =>
  getType(useCategory, useType)['logos'].find(
    ({ logo }) => logo.toLowerCase() === useLogo.toLowerCase()
  );

export const getColor = (useCategory, useType, useLogo, useColor) =>
  getLogo(useCategory, useType, useLogo)['colors'].find(
    ({ color }) => color.toLowerCase() === useColor.toLowerCase()
  );

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

// export const getCategoryItems = (useCategory) => {
//   const buildStore = [];
//   const { products, category } = store.find(
//     ({ category }) => category.toLowerCase() === useCategory.toLowerCase()
//   );

//   products.forEach(({ type, logo: logos, color: colors, size: sizes }) => {
//     const link = `/products/${category}/${type}`.toLowerCase();
//     const imageSlug = `${category}${type}${rand(logos)}${rand(colors)}`.replace(
//       ' ',
//       ''
//     );
//     const image = `/images/products/${category.toLowerCase()}/${type.toLowerCase()}/${imageSlug}.jpg`;
//     buildStore.push({ category, type, link, image, colors });
//   });

//   return buildStore;
// };

// export const newStore = (useCategory, useType, useLogo, useColor) => {
//   const buildStore = [];
//   store.forEach(({ category, products }) => {
//     if (checkIf(useCategory, category)) {
//       products.forEach(({ type, logo: logos, color: colors, size: sizes }) => {
//         if (checkIf(useType, type)) {
//           logos.forEach((logo) => {
//             if (checkIf(useLogo, logo)) {
//               if (useLogo) {
//                 colors.forEach((color) => {
//                   if (checkIf(useColor, color)) {
//                     buildStore.push(
//                       modalProduct({
//                         category,
//                         type,
//                         logo,
//                         color,
//                         colors,
//                         sizes,
//                       })
//                     );
//                   }
//                 });
//               } else {
//                 buildStore.push({
//                   category,
//                   type,
//                   logo,
//                   colors,
//                 });
//               }
//             }
//           });
//         }
//       });
//     }
//   });
//   return buildStore;
// };

// const modalProduct = (values) => {
//   const { category, type, logo, color, colors, sizes } = values;
//   const name = `${type} ${logo} ${color}`;
//   const description = `Loyal To Few ${category.toLowerCase()} custom ${color.toLowerCase()} ${type.toLowerCase()} with ${logo.toLowerCase()} logo. Get yours now in ${sizes
//     ?.join(', ')
//     .toLowerCase()} sizes.`;
//   const imageSlug = `${category}${type}${logo}${color.replace(' ', '')}`;
//   const image = `/images/products/${category.toLowerCase()}/${type.toLowerCase()}/${imageSlug}.jpg`;
//   const id = imageSlug.toLowerCase();
//   const linkCategory = `/products/${category}`.toLowerCase();
//   const linkType = `/products/${category}/${type}`.toLowerCase();
//   const linkLogo = `/products/${category}/${type}/${logo}`.toLowerCase();
//   const linkColor =
//     `/products/${category}/${type}/${logo}/${color}`.toLowerCase();
//   return {
//     id,
//     name,
//     description,
//     image,
//     category,
//     type,
//     logo,
//     color,
//     linkCategory,
//     linkType,
//     linkLogo,
//     linkColor,
//     colors,
//     sizes,
//   };
// };
// const checkIf = (useCheck, check) =>
//   !useCheck ||
//   (check && check.toLocaleLowerCase() === useCheck.toLocaleLowerCase());

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
