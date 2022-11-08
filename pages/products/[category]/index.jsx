import { getStore, getCategory } from '../../../data/storeModals';
import Image from 'next/image';
import Link from 'next/link';

const Products = ({ category, products }) => {
  if (!products?.length) return <p>Loading…</p>;

  return (
    <>
      <h3>{category}</h3>
      {products.map(({ type, link, image }) => (
        <div key={type}>
          <Link href={link}>
            <p>{type}</p>
            <div>
              <Image src={image} alt={type} width='100' height='100' />
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export async function getStaticProps(context) {
  const categories = getCategory(context.params.category);

  if (!categories) return { notFound: true };

  const { category, products } = categories;

  return {
    props: {
      category,
      products,
    },
  };
}

export async function getStaticPaths() {
  const paths = getStore().map(({ category }) => ({
    params: { category: category.toLowerCase() },
  }));
  console.log('.>>>>>>>>>>>', paths);
  return {
    paths,
    fallback: true,
  };
}

export default Products;
