import { getStore, getLogo } from '../../../../../data/storeModals';
import Image from 'next/image';
import Link from 'next/link';

const Products = ({ productLogo }) => {
  if (!productLogo) return <p>Loading…</p>;
  const { name, link, image, colors, category, type } = productLogo;
  return (
    <>
      <h3>
        <Link href='/products'>Products</Link> /{' '}
        <Link href={category.link}>{category.name}</Link> /{' '}
        <Link href={type.link}>{type.name}</Link>
      </h3>
      <div>
        <p>{name}</p>
        <div>
          <Image src={image} alt={name} width='100' height='100' />
        </div>
        <div>
          {colors.map((color, i) => (
            <span key={color}>
              {i ? ', ' : ''}
              <Link href={`${link}/${color.toLowerCase()}`}>{color}</Link>
            </span>
          ))}
        </div>
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
