import { getStore, getColor } from '../../../../../../data/storeModals';
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
  const { category, type, logo, color } = context.params;
  const productLogo = getColor(category, type, logo, color);

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
    products.map(({ type, logos, colors }) =>
      logos.map(({ logo }) =>
        colors.map((color) =>
          paths.push({
            params: {
              category: category.toLowerCase(),
              type: type.toLowerCase(),
              logo: logo.toLowerCase(),
              color: color.toLowerCase(),
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

export default Products;
