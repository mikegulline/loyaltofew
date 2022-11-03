import useProducts from '../hooks/useProducts';
import ListProduct from './ListProduct';

const List = () => {
  const products = useProducts();

  if (!products.length) return <p>Loading…</p>;

  return (
    <>
      {products.map((item) => (
        <ListProduct item={item} key={item.id} />
      ))}
    </>
  );
};

export default List;
