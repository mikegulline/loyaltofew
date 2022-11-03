import Image from 'next/image';
import Link from 'next/link';

const ListProduct = ({
  item: {
    category,
    name,
    type,
    color,
    colors,
    logo,
    image,
    linkCategory,
    linkType,
    linkLogo,
    linkColor,
  },
}) => {
  return (
    <div>
      <p>
        <Link href='/products'>Products</Link>/
        <Link href={linkCategory}>{category}</Link>/
        <Link href={linkType}>{type}</Link>/<Link href={linkLogo}>{logo}</Link>
      </p>
      <h3>{name}</h3>
      <Link href={linkColor}>
        <Image src={image} alt={name} width='100' height='100' />
      </Link>
      <p>
        Colors:{' '}
        {colors?.map((name, i) => (
          <>
            {i ? ', ' : ''}
            <Link
              href={`${linkLogo}/${name.replace(' ', '')}`.toLowerCase()}
              key={i}
            >
              {name}
            </Link>
          </>
        ))}
      </p>
      <br />
      <Link href={linkColor}>View Product</Link>
      <hr />
    </div>
  );
};

export default ListProduct;
