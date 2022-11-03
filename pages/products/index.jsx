import { useState, useEffect } from 'react';
import axios from 'axios';
import ListProduct from '../../components/ListProduct';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    })();
  }, [setProducts]);

  if (!products.length) return <p>Loading…</p>;

  return (
    <>
      {products.map((item) => (
        <ListProduct item={item} key={item.id} />
      ))}
    </>
  );
};

export default Products;
