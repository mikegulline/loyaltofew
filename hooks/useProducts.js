import { newStore } from '../data/store';
import { useRouter } from 'next/router';

const useProducts = () => {
  const router = useRouter();
  const slug = router.query.slug;
  const products = (slug && newStore(...slug)) || [];

  return products;
};

export default useProducts;

///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';

// const useProducts = () => {
//   const [products, setProducts] = useState([]);
//   const router = useRouter();
//   const slug = router.query.slug;

//   useEffect(() => {
//     if (slug) {
//       (async () => {
//         const { data } = await axios.get(`/api/products/${slug.join('/')}`);
//         setProducts(data);
//       })();
//     }
//   }, [setProducts, slug]);

//   return products;
// };

// export default useProducts;
