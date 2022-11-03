import List from '../../components/List';

const Products = () => {
  return <List />;
};

export default Products;

////////////////////////////
////////////////////////////
////////////////////////////
////////////////////////////
////////////////////////////
// import { newStore } from '../../data/store';
// import ListProduct from '../../components/ListProduct';
// import { useRouter } from 'next/router';

// const Products = () => {
//   const router = useRouter();
//   const slug = router.query.slug;
//   const products = (slug && newStore(...slug)) || [];

//   if (!products.length) return <p>Loading…</p>;

//   return (
//     <>
//       <>{slug.length}</>
//       {products.map((item) => (
//         <ListProduct item={item} key={item.id} />
//       ))}
//     </>
//   );
// };

// export default Products;
