import { getStore, getLogo, getColor } from '@/data/storeModals';
import { useRouter } from 'next/router';
import { getPlaiceholder } from 'plaiceholder';
import ProductPage from '@/layout/ProductPage/ProductPage';
import SEO from '@/components/SEO';
import getMeta from '@/utils/getMeta';
import Breadcrumbs from '@/components/Breadcrumbs';

const Product = ({ product }) => {
  const router = useRouter();
  const size = router?.query?.s || 0;
  if (!product) return <p>Loading…</p>;
  const { name, color, breadcrumbs } = product;

  const meta = getMeta(product.meta, `Loyal To Few (LTF) ${name} (${color})`);

  return (
    <>
      <SEO {...meta} />

      <Breadcrumbs links={breadcrumbs} />

      <ProductPage product={product} size={size} />
    </>
  );
};

const getParams = async (params) => {
  const {
    category,
    type,
    logocolor: [logo, color],
  } = params;

  let product;

  if (!color) {
    product = getLogo(category, type, logo);

    if (product) product = getColor(category, type, logo, product.colors[0]);
  } else product = getColor(category, type, logo, color);

  const { base64, img } = await getPlaiceholder(product.image);

  product = {
    ...product,
    imageProps: {
      ...img,
      blurDataURL: base64,
    },
  };

  return product;
};

export async function getStaticProps(context) {
  const product = await getParams(context.params);

  if (!product) return { notFound: true };

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const paths = [];
  const { categories } = getStore();
  categories.map(({ category, products }) =>
    products.map(({ type, logos, colors }) =>
      logos.map(({ logo }) =>
        colors.map((color) =>
          paths.push({
            params: {
              category: category.toLowerCase(),
              type: type.toLowerCase(),
              logocolor: [logo.toLowerCase(), color.toLowerCase()],
            },
          })
        )
      )
    )
  );

  return {
    paths,
    fallback: true,
  };
}

export default Product;
