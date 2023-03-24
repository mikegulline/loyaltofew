import { store } from './store';

const storeRoot = 'Store';
const storePath = 'store';

export const modalStore = () => {
  const categories = store.map((category) => modalCategory(category));
  const breadcrumbs = [[storeRoot, `/${storePath}`]];

  return {
    breadcrumbs,
    categories,
  };
};

const modalCategory = ({ category, name, meta, products: productsArray }) => {
  const link = `/${storePath}/${category}`.toLowerCase();
  const products = productsArray.map((product) =>
    modalProduct({ ...product, category })
  );

  return {
    category,
    name,
    link,
    meta,
    products,
  };
};

const modalProduct = ({
  category,
  type,
  logos: logosArray,
  colors,
  sizes,
  product: name,
  has_image_back,
  details,
  weight,
  meta,
  tags,
}) => {
  const randLogo = rand(logosArray);
  const randColor = rand(colors);
  const link =
    `/${storePath}/${category}/${type}/${randLogo}/${randColor}`.toLowerCase();
  const imageSlug = `${category}${type}${randLogo}${randColor}`.replace(
    ' ',
    ''
  );
  const image = `/images/products/${category.toLowerCase()}/${type.toLowerCase()}/${imageSlug}.jpg`;
  const logos = logosArray.map((logo) =>
    modalLogo({ logo, category, type, colors, name, has_image_back })
  );

  return {
    type,
    name,
    link,
    image,
    has_image_back,
    weight,
    meta,
    tags,
    logos,
    sizes,
    colors,
    details,
  };
};

const modalLogo = (values) => {
  const {
    logo,
    category,
    type,
    colors,
    name: product,
    has_image_back,
  } = values;
  const link = `/${storePath}/${category}/${type}/${logo}`.toLowerCase();
  const linkColor =
    `/${storePath}/${category}/${type}/${logo}/${colors[0]}`.toLowerCase();
  const imageDir = `/images/products/${category}/${type}`.toLowerCase();
  const imageColorBackRoot = `${imageDir}/${category}${type}Back`;
  const imageColorRoot = `${imageDir}/${category}${type}${logo}`.replace(
    ' ',
    ''
  );
  const imageBack = `${imageColorBackRoot}${colors[0]}.jpg`;
  const image = `${imageColorRoot}${colors[0]}.jpg`;
  const name = `${product} with ${logo} Design`;

  return {
    name,
    link,
    linkColor,
    has_image_back,
    imageBack,
    image,
    imageColorRoot,
    imageColorBackRoot,
    logo,
  };
};

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////
//################ /api/products
export const getStore = () => modalStore();

//////////////////////////////////////////
//########### /api/products/mens
export const getCategory = (useCategory) => {
  const { breadcrumbs, categories } = modalStore();
  const category = categories.find(
    ({ category }) => category.toLowerCase() === useCategory.toLowerCase()
  );
  breadcrumbs.push([category.name, category.link]);

  return {
    breadcrumbs,
    ...category,
  };
};

//////////////////////////////////////////
//####### /api/products/mens/tee
export const getType = (useCategory, useType) => {
  const passCategory = getCategory(useCategory);
  const { category: categoryName, name, link, breadcrumbs } = passCategory;
  const product = passCategory['products'].find(
    ({ type }) => type.toLowerCase() === useType.toLowerCase()
  );
  breadcrumbs.push([product.name, `${link}/${product.type}`.toLowerCase()]);
  const category = {
    category: categoryName,
    name,
    link,
  };
  return {
    breadcrumbs,
    ...product,
    category,
  };
};

//////////////////////////////////////////
//########### /api/products/mens/tee/block
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
    weight,
    meta,
    tags,
    logos,
    has_image_back,
  } = theType;
  const passLogo = theType['logos'].find(
    ({ logo }) => logo.toLowerCase() === useLogo.toLowerCase()
  );
  breadcrumbs.push([passLogo.logo, '']);
  return {
    ...passLogo,
    has_image_back,
    breadcrumbRoot: [passLogo.logo, passLogo.link],
    breadcrumbs,
    tags,
    weight,
    meta,
    sizes,
    colors,
    logos,
    details,
    category,
    type: {
      type,
      name,
      link,
    },
  };
};

//////////////////////////////////////////
//##### /api/products/mens/tee/block/black
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
    weight,
    meta,
    tags,
    logos,
    imageColorRoot,
    imageColorBackRoot,
    has_image_back,
  } = product;

  const imageSlug = `${category.category}${type.type}${logo}${color}`.replace(
    ' ',
    ''
  );
  const id = imageSlug.toLowerCase();
  const imageRoot = `/images/products/${category.category.toLowerCase()}/${type.type.toLowerCase()}/`;
  const image = `${imageColorRoot}${color}.jpg`;
  const imageBack = `${imageColorBackRoot}${color}.jpg`;

  const bcLast = breadcrumbs.pop();
  const bcText = `${bcLast[0]} (${color})`;
  breadcrumbs.push([bcText, '']);

  return {
    id,
    name,
    link,
    imageRoot,
    image,
    imageBack,
    has_image_back,
    color,
    logo,
    weight,
    meta,
    colors,
    logos,
    sizes,
    details,
    category,
    type,
    tags,
    breadcrumbs,
  };
};

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
