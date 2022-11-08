import { getStore } from '../../data/storeModals';
import Image from 'next/image';
import Link from 'next/link';

const Products = ({ categories }) => {
  if (!categories.length) return <p>Loading…</p>;

  return (
    <>
      {categories.map(({ category, link, products }) => (
        <div key={category}>
          <h3>
            <Link href={link}>{category}</Link>
          </h3>
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
        </div>
      ))}
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      categories: getStore(),
    },
  };
}

export default Products;
