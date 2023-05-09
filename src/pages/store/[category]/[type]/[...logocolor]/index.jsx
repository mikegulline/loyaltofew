// import store from '@/public/data/store';
import storeNew from '@/public/data/store-new';
import ProductPage from '@/layout/ProductPage/ProductPage';
import SEO from '@/components/SEO';
import getMeta from '@/utils/getMeta';
import Breadcrumbs from '@/components/Breadcrumbs';
import Category from '@/components/Category/Category';
import Container from '@/components/Container';
import { useState, useEffect } from 'react';
let fs = require('fs');

const Product = ({ product, category }) => {
  if (!product) return <p>Loading…</p>;
  const { name, color, breadcrumbs } = product;

  const meta = getMeta(product.meta, `Loyal To Few® (LTF) ${name} (${color})`);

  return (
    <>
      <SEO {...meta} />

      <Breadcrumbs links={breadcrumbs} />

      <ProductPage product={product} />

      <div className=' mb-32 h-0 w-full border-t-4 border-gray-400' />
      <ShowAt y={100}>
        <Container>
          <h2 className='mb-8 mt-8 text-6xl font-black text-gray-900 md:text-7xl'>
            {category.name}
          </h2>
          <Category products={category.products} />
        </Container>
      </ShowAt>
    </>
  );
};

const ShowAt = ({ y, children }) => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!shown) {
      const handleScroll = (e) => {
        if (e.target.documentElement.scrollTop >= y) setShown(true);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  });

  if (!shown) return null;

  return <>{children}</>;
};

export async function getStaticProps(context) {
  const {
    category: isCategory,
    type,
    logocolor: [logo, color],
  } = context.params;

  if (!color) {
    console.log('redirect');
    return {
      redirect: {
        destination: `/store/${isCategory}/${type}`,
      },
    };
  }

  const product = await JSON.parse(
    fs.readFileSync(
      `public/data/${isCategory}-${type}-${logo}-${color}.json`,
      'utf8'
    )
  );

  if (!product) return { notFound: true };

  const category = await JSON.parse(
    fs.readFileSync(`public/data/${isCategory}.json`, 'utf8')
  );

  return {
    props: {
      product,
      category,
    },
  };
}

export async function getStaticPaths() {
  const paths = [];
  const { categories } = storeNew;
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
