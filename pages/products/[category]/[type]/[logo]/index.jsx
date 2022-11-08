import { getStore, getLogo } from '../../../../../data/storeModals';
import Image from 'next/image';
import Link from 'next/link';

const Products = ({ category, productLogo }) => {
  if (!productLogo) return <p>Loading…</p>;
  const { product, link, image } = productLogo;
  return (
    <>
      <h3>{category}</h3>
      <div>
        <Link href={link}>
          <p>{product}</p>
          <div>
            <Image src={image} alt={product} width='100' height='100' />
          </div>
        </Link>
      </div>
    </>
  );
};

export async function getStaticProps(context) {
  const { category, type, logo } = context.params;
  const productLogo = getLogo(category, type, logo);

  if (!productLogo) return { notFound: true };

  return {
    props: {
      category,
      type,
      productLogo,
    },
  };
}

export async function getStaticPaths() {
  const paths = [];
  getStore().map(({ category, products }) =>
    products.map(({ type, logos }) =>
      logos.map(({ logo }) =>
        paths.push({
          params: {
            category: category.toLowerCase(),
            type: type.toLowerCase(),
            logo: logo.toLowerCase(),
          },
        })
      )
    )
  );

  return {
    paths,
    fallback: true,
  };
}

export default Products;
