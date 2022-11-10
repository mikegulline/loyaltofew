import { store } from './store';

const storeRoot = 'Store';
const storePath = 'store';

export const getStore = () => ({
  breadcrumbs: [[storeRoot, `/${storePath}`]],
  categories: processCategory(),
});
// export const getStore = () => processCategory();

const processCategory = () => store.map((category) => modalCategory(category));

const modalCategory = (values) => {
  const { category, products, name, meta } = values;
  const link = `/${storePath}/${category}`.toLowerCase();
  return {
    category,
    name,
    link,
    meta,
    products: processProducts(category, products),
  };
};

const processProducts = (category, products) =>
  products.map((product) => modalProduct({ ...product, category }));

const modalProduct = (values) => {
  const { category, type, logo, colors, sizes, product, details, meta, tags } =
    values;
  const link = `/${storePath}/${category}/${type}`.toLowerCase();
  //rand(colors)
  const imageSlug = `${category}${type}${rand(logo)}${colors[0]}`.replace(
    ' ',
    ''
  );
  const image = `/images/products/${category.toLowerCase()}/${type.toLowerCase()}/${imageSlug}.jpg`;
  return {
    type,
    name: product,
    link,
    image,
    meta,
    tags,
    logos: processLogos(logo, category, type, colors, product),
    sizes,
    colors,
    details,
  };
};

const processLogos = (logos, category, type, colors, product) =>
  logos.map((logo) =>
    modalLogo({ logos, logo, category, type, colors, product })
  );

const modalLogo = (values) => {
  const { logo, category, type, colors, product } = values;
  const link = `/${storePath}/${category}/${type}/${logo}`.toLowerCase();
  const imageSlug = `${category}${type}${logo}${colors[0]}`.replace(' ', '');
  const image = `/images/products/${category.toLowerCase()}/${type.toLowerCase()}/${imageSlug}.jpg`;
  const name = `${product} with ${logo} Design`;
  return {
    name,
    link,
    image,
    logo,
  };
};

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

export const getCategory = (useCategory) => {
  const { breadcrumbs, categories } = getStore();
  const category = categories.find(
    ({ category }) => category.toLowerCase() === useCategory.toLowerCase()
  );
  breadcrumbs.push([category.name, category.link]);
  return {
    breadcrumbs,
    ...category,
  };
};
export const getType = (useCategory, useType) => {
  const passCategory = getCategory(useCategory);
  const { category, name, link, breadcrumbs } = passCategory;
  const product = passCategory['products'].find(
    ({ type }) => type.toLowerCase() === useType.toLowerCase()
  );
  breadcrumbs.push([product.name, product.link]);
  return {
    breadcrumbs,
    ...product,
    category: {
      category,
      name,
      link,
    },
  };
};

export const getLogo = (useCategory, useType, useLogo) => {
  const theType = getType(useCategory, useType);
  const {
    type,
    link,
    sizes,
    colors,
    details,
    category,
    name,
    breadcrumbs,
    meta,
    tags,
  } = theType;
  const passLogo = theType['logos'].find(
    ({ logo }) => logo.toLowerCase() === useLogo.toLowerCase()
  );
  breadcrumbs.push([passLogo.logo, passLogo.link]);
  return {
    breadcrumbs,
    ...passLogo,
    tags,
    meta,
    sizes,
    colors,
    details,
    category,
    type: {
      type,
      name,
      link,
    },
  };
};

export const getColor = (useCategory, useType, useLogo, useColor) => {
  const product = getLogo(useCategory, useType, useLogo);
  const color = product.colors.find(
    (color) => color.toLowerCase() === useColor.toLowerCase()
  );
  const {
    logo,
    name,
    link,
    sizes,
    colors,
    details,
    category,
    type,
    breadcrumbs,
    meta,
    tags,
  } = product;
  const imageSlug = `${category.category}${type.type}${logo}${color}`.replace(
    ' ',
    ''
  );
  const image = `/images/products/${category.category.toLowerCase()}/${type.type.toLowerCase()}/${imageSlug}.jpg`;
  breadcrumbs.push([color, `${link}/${useColor}`]);
  return {
    breadcrumbs,
    name,
    link,
    image,
    logo,
    color,
    tags,
    meta,
    sizes,
    colors,
    details,
    category,
    type,
  };
};

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
