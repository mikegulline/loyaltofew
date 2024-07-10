const store = require('./store');

const storeRoot = 'Store';
const storePath = 'store';

const kebab = (s) => s.replaceAll(' ', '-');
const camal = (s) => s.replaceAll(/-|\s/g, '');
const getImage = (...args) => camal(args.join(''));
const getLink = (...args) => '/' + kebab(args.join('/')).toLowerCase();

const getId = (category, type, logo, color) => {
  return `${category}:${type}:${color}:${kebab(logo)}`
    .replace(' ', '')
    .toLowerCase();
};

const getImagePath = (category, type, logo, color, unique_back) => {
  const imagePath = `/images/products/${category}/${type}/`.toLowerCase();
  let front = `${category}${type}${logo}${color}.jpg`;
  let back = unique_back?.includes(logo)
    ? `${category}${type}${logo}${color}Back.jpg`
    : `${category}${type}${color}Back.jpg`;

  return {
    image: imagePath + front.replaceAll(' ', ''),
    imageBack: imagePath + back.replaceAll(' ', ''),
  };
};

const modalStore = () => {
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
  colorsAlt = {},
  sizes,
  product: name,
  has_image_back,
  unique_back,
  details,
  weight,
  meta,
  irl: actionShots,
  tags,
}) => {
  const randLogo = rand(logosArray);
  // const randLogo = logosArray[logosArray.length - 1];
  const logoColors = colorsAlt.hasOwnProperty(randLogo)
    ? colorsAlt[randLogo]
    : colors;
  const link = `/${storePath}/${category}/${type}`.toLowerCase();
  // const link = `/${storePath}/${category}/${type}/${kebab(randLogo)}/${
  //   logoColors[0]
  // }`.toLowerCase();
  const imageSlug = `${category}${type}${randLogo}${logoColors[0]}`.replace(
    ' ',
    ''
  );
  const image = `/images/products/${category.toLowerCase()}/${type.toLowerCase()}/${imageSlug}.jpg`;
  const logos = logosArray.map((logo) => {
    let passColors = colorsAlt.hasOwnProperty(logo) ? colorsAlt[logo] : colors;

    return modalLogo({
      logo,
      category,
      type,
      colors: passColors,
      name,
      has_image_back,
      unique_back,
    });
  });

  const irl = actionShots.map((img) => {
    const irlRoot = '/images/irl/';
    return irlRoot + img;
  });

  return {
    type,
    name,
    link,
    image,
    has_image_back,
    unique_back,
    weight,
    meta,
    irl,
    tags,
    logos,
    sizes,
    colors,
    colorsAlt,
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
    unique_back,
  } = values;
  const link = `/${storePath}/${category}/${type}/${kebab(logo)}`.toLowerCase();
  const linkColor = `/${storePath}/${category}/${type}/${kebab(logo)}/${
    colors[0]
  }`.toLowerCase();
  const imageDir = `/images/products/${category}/${type}`.toLowerCase();
  const imageColorBackRoot = `${imageDir}/${category}${type}Back`;
  const imageColorRoot = `${imageDir}/${category}${type}${logo}`.replace(
    ' ',
    ''
  );
  const imageBack = `${imageColorBackRoot}${colors[0]}.jpg`;
  const image = `${imageColorRoot}${colors[0]}.jpg`;
  const name = `${product} with ${logo}`;

  return {
    colors,
    name,
    link,
    linkColor,
    has_image_back,
    unique_back,
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
const getStore = () => modalStore();

//////////////////////////////////////////
//########### /api/products/mens
const getCategory = (useCategory) => {
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
const getType = (useCategory, useType) => {
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
const getLogo = (useCategory, useType, useLogo) => {
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
    irl,
    tags,
    logos,
    has_image_back,
    unique_back,
  } = theType;
  const passLogo = theType['logos'].find(
    ({ logo }) => logo.toLowerCase() === useLogo.toLowerCase()
  );
  breadcrumbs.push([passLogo.logo, '']);
  return {
    ...passLogo,
    has_image_back,
    unique_back,
    breadcrumbRoot: [passLogo.logo, passLogo.link],
    breadcrumbs,
    tags,
    weight,
    meta,
    irl,
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
const getColor = (useCategory, useType, useLogo, useColor) => {
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
    irl,
    tags,
    logos,
    imageColorRoot,
    imageColorBackRoot,
    has_image_back,
    unique_back,
  } = product;
  const id = getId(category.category, type.type, logo, color);
  console.log(id, category.category, type.type, logo, color);

  const { image, imageBack } = getImagePath(
    category.category,
    type.type,
    logo,
    color,
    unique_back
  );

  const bcLast = breadcrumbs.pop();
  const bcText = `${bcLast[0]} (${color})`;
  breadcrumbs.push([bcText, '']);

  return {
    id,
    name,
    link,
    image,
    imageBack,
    has_image_back,
    color,
    logo,
    weight,
    meta,
    irl,
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

module.exports = {
  getStore,
  getCategory,
  getType,
  getLogo,
  getColor,
  kebab,
};
