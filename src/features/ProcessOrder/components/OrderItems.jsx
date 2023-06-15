import OrderItem from './OrderItem';
const OrderItems = ({ items, metadata, updateOrder }) => {
  return (
    <ul className='flex justify-center gap-4'>
      {items.map((item, i) => {
        const updateItemsPacked = () => {
          const updatePacked = [...metadata.packed];
          if (!updatePacked[i]) {
            const status =
              updatePacked.reduce((acc, cur) => Number(acc + cur), [0]) ===
              updatePacked.length - 1
                ? 'Packed'
                : 'Processed';
            updatePacked[i] = 1;
            updateOrder({
              metadata: {
                ...metadata,
                packed: updatePacked,
                status,
              },
            });
          }
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
