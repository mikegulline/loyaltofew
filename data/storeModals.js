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
  details,
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
    modalLogo({ logo, category, type, colors, name })
  );

  return {
    type,
    name,
    link,
    image,
    meta,
    tags,
    logos,
    sizes,
    colors,
    details,
  };
};

const modalLogo = (values) => {
  const { logo, category, type, colors, name: product } = values;
  const link = `/${storePath}/${category}/${type}/${logo}`.toLowerCase();
  const imageColorRoot =
    `/images/products/${category.toLowerCase()}/${type.toLowerCase()}/${category}${type}${logo}`.replace(
      ' ',
      ''
    );
  const imageSlug = `${category}${type}${logo}${colors[0]}`.replace(' ', '');
  const image = `/images/products/${category.toLowerCase()}/${type.toLowerCase()}/${imageSlug}.jpg`;
  const name = `${product} with ${logo} Design`;

  return {
    name,
    link,
    image,
    imageColorRoot,
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
  breadcrumbs.push([product.name, product.link]);
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
    meta,
    tags,
  } = theType;
  const passLogo = theType['logos'].find(
    ({ logo }) => logo.toLowerCase() === useLogo.toLowerCase()
  );
  const bcText = `${passLogo.logo} (${colors[0]})`;
  const bcLink = `${passLogo.link}/${colors[0].toLowerCase()}`;
  breadcrumbs.push([bcText, bcLink]);
  return {
    ...passLogo,
    breadcrumbRoot: [passLogo.logo, passLogo.link],
    breadcrumbs,
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
    meta,
    tags,
  } = product;

  const imageSlug = `${category.category}${type.type}${logo}${color}`.replace(
    ' ',
    ''
  );
  const id = imageSlug.toLowerCase();
  const imageRoot = `/images/products/${category.category.toLowerCase()}/${type.type.toLowerCase()}/`;
  const image = `${imageRoot}${imageSlug}.jpg`;
  breadcrumbs.pop();
  const breadcrumbText = `${logo} (${color})`;
  const breadcrumbLink = `${link}/${color.toLowerCase()}`;
  breadcrumbs.push([breadcrumbText, breadcrumbLink]);

  return {
    id,
    name,
    link,
    imageRoot,
    image,
    color,
    logo,
    meta,
    colors,
    sizes,
    details,
    category,
    type,
    tags,
    breadcrumbs,
  };
};

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
