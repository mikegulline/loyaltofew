import { getStore, getType } from '../../../../data/storeModals';
import Image from 'next/image';
import Link from 'next/link';

const Products = ({ category, product }) => {
  if (!product?.logos?.length) return <p>Loading…</p>;

  return (
    <>
      <h3>{category}</h3>
      {product.logos.map(({ logo, product, link, image }) => (
        <div key={logo}>
          <Link href={link}>
            <p>{product}</p>
            <div>
              <Image src={image} alt={product} width='100' height='100' />
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export async function getStaticProps(context) {
  const { category, type } = context.params;
  const product = getType(category, type);

  if (!product) return { notFound: true };

  return {
    props: {
      category,
      product,
    },
  };
}

export async function getStaticPaths() {
  const paths = [];
  getStore().map(({ category, products }) =>
    products.map(({ type }) =>
      paths.push({
        params: { category: category.toLowerCase(), type: type.toLowerCase() },
      })
    )
  );

  return {
    paths,
    fallback: true,
  };
}

export default Products;
