export const store = [
  {
    category: 'Mens',
    products: [
      {
        type: 'Tee',
        logo: ['Arch', 'Block', 'Horizontal', 'Round'],
        color: ['Black', 'Gray', 'Green', 'Maroon', 'Navy'],
        size: ['Small', 'Medium', 'Large', 'XL'],
      },
      {
        type: 'Tank',
        logo: ['Arch', 'Block', 'Horizontal', 'Round'],
        color: ['Black'],
        size: ['Small', 'Medium', 'Large', 'XL'],
      },
      {
        type: 'Sleeves',
        logo: ['Arch', 'Block', 'Horizontal', 'Round'],
        color: ['Black', 'Gray', 'Navy'],
        size: ['Small', 'Medium', 'Large', 'XL'],
      },
    ],
  },
  {
    category: 'Womens',
    products: [
      {
        type: 'Crop',
        logo: ['Arch', 'Block', 'Horizontal', 'Round'],
        color: ['Black', 'Gray', 'Navy', 'Red'],
        size: ['Small', 'Medium', 'Large', 'XL'],
      },
      {
        type: 'Tank',
        logo: ['Arch', 'Block', 'Horizontal', 'Round'],
        color: ['Blue', 'Gray', 'Maroon'],
        size: ['Small', 'Medium', 'Large', 'XL'],
      },
      {
        type: 'Tee',
        logo: ['Arch', 'Block', 'Horizontal', 'Round'],
        color: ['Navy', 'Red'],
        size: ['Small', 'Medium', 'Large', 'XL'],
      },
    ],
  },
  {
    category: 'Outerwear',
    products: [
      {
        type: 'Hoodie',
        logo: ['Arch', 'Block', 'Horizontal', 'Round'],
        color: ['Black', 'Dolphin Blue', 'Gray', 'Green', 'Navy', 'Off Black'],
        size: ['Small', 'Medium', 'Large', 'XL'],
      },
    ],
  },
  {
    category: 'Hats',
    products: [
      {
        type: 'Beanie',
        logo: ['Block'],
        color: ['Black', 'Gray', 'Navy'],
        size: ['All'],
      },
      {
        type: 'Snapback',
        logo: ['Block'],
        color: ['Black', 'Black White', 'Gray White', 'Navy White'],
        size: ['Adjustable'],
      },
    ],
  },
];
export const newStore = (useCategory, useType, useLogo, useColor) => {
  const buildStore = [];
  store.forEach(({ category, products }) => {
    if (checkIf(useCategory, category)) {
      products.forEach(({ type, logo: logos, color: colors, size: sizes }) => {
        if (checkIf(useType, type)) {
          logos.forEach((logo) => {
            if (checkIf(useLogo, logo)) {
              colors.forEach((color) => {
                if (checkIf(useColor, color)) {
                  buildStore.push(
                    modalProduct({
                      category,
                      type,
                      logo,
                      color,
                      colors,
                      sizes,
                    })
                  );
                }
              });
            }
          });
        }
      });
    }
  });
  return buildStore;
};
const modalProduct = (values) => {
  const { category, type, logo, color, colors, sizes } = values;
  const name = `${type} ${logo} ${color}`;
  const description = `Loyal To Few ${category.toLowerCase()} custom ${color.toLowerCase()} ${type.toLowerCase()} with ${logo.toLowerCase()} logo. Get yours now in ${sizes
    ?.join(', ')
    .toLowerCase()} sizes.`;
  const imageSlug = `${category}${type}${logo}${color.replace(' ', '')}`;
  const image =
    `/images/products/${category}/${type}/${imageSlug}.jpg`.toLowerCase();
  const id = imageSlug.toLowerCase();
  const linkCategory = `/products/${category}`.toLowerCase();
  const linkType = `/products/${category}/${type}`.toLowerCase();
  const linkLogo = `/products/${category}/${type}/${logo}`.toLowerCase();
  const linkColor =
    `/products/${category}/${type}/${logo}/${color}`.toLowerCase();
  return {
    id,
    name,
    description,
    image,
    category,
    type,
    logo,
    color,
    linkCategory,
    linkType,
    linkLogo,
    linkColor,
    colors,
    sizes,
  };
};
const checkIf = (useCheck, check) =>
  !useCheck || check.toLocaleLowerCase() === useCheck.toLocaleLowerCase();
