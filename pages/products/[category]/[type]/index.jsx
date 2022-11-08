import { getStore, getType } from '../../../../data/storeModals';
import Image from 'next/image';
import Link from 'next/link';

const Products = ({ products }) => {
  if (!products?.logos?.length) return <p>Loading…</p>;

  const { category, type, name, image, link, logos } = products;

  return (
    <>
      <h3>
        <Link href='/products'>Products</Link> /{' '}
        <Link href={category.link}>{category.name}</Link> /{' '}
        <Link href={link}>{type}</Link>
      </h3>
      {logos.map(({ logo, name, link, image }) => (
        <div key={logo}>
          <Link href={link}>
            <p>{name}</p>
            <div>
              <Image src={image} alt={name} width='100' height='100' />
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export async function getStaticProps(context) {
  const { category, type } = context.params;
  const products = getType(category, type);

  if (!products) return { notFound: true };

  return {
    props: {
      products,
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
