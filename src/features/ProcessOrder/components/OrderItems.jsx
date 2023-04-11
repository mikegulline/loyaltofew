import OrderItem from './OrderItem';
const OrderItems = ({ items, metadata, updateOrder }) => {
  return (
    <ul className='flex justify-center gap-4'>
      {items.map((item, i) => {
        const updateItemsPacked = () => {
          const updatePacked = [...metadata.packed];
          updatePacked[i] = updatePacked[i] ? 0 : 1;
          updateOrder({
            metadata: {
              ...metadata,
              packed: updatePacked,
            },
          });
        };

        return (
          <OrderItem
            key={item.id}
            item={item}
            isPacked={metadata.packed[i]}
            handleUpdateItemsPacked={updateItemsPacked}
          />
        );
      })}
    </ul>
  );
};

export default OrderItems;
