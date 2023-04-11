import OrderItem from './OrderItem';

const OrderItems = ({ items, metadata, updateOrder }) => {
  if (metadata?.shipping) {
    delete metadata.shipping;
  }
  if (metadata?.returns) {
    delete metadata.returns;
  }
  if (!metadata?.return) {
    metadata = { ...metadata, return: {} };
  }
  // console.log(metadata);
  return (
    <ul className='flex justify-center gap-4'>
      {items.map((item, i) => {
        const updateItemsReturn = () => {
          if (!metadata?.returnData?.labelSent) {
            const updatePacked = processUpdatePacked(item, metadata);
            const returnData = processReturnData(updatePacked);

            updateOrder({
              metadata: {
                ...metadata,
                return: updatePacked,
                returnData,
              },
            });
          }
        };
        const returnTotal =
          metadata?.return[item.uniqueId]?.returnQuantity || 0;
        return (
          <OrderItem
            key={item.id}
            item={item}
            isPacked={item.uniqueId in metadata.return}
            returnTotal={returnTotal}
            handleUpdateItemsPacked={updateItemsReturn}
          />
        );
      })}
    </ul>
  );
};

const processUpdatePacked = (item, metadata) => {
  const { quantity, price, weight, name, uniqueId } = item;
  const updatePacked = { ...metadata.return };
  if (
    uniqueId in updatePacked &&
    updatePacked[uniqueId].returnQuantity === quantity
  ) {
    delete updatePacked[uniqueId];
  } else if (uniqueId in updatePacked) {
    updatePacked[uniqueId].returnQuantity++;
    updatePacked[uniqueId].refund =
      price * updatePacked[uniqueId].returnQuantity;
    updatePacked[uniqueId].totalWeight =
      weight * updatePacked[uniqueId].returnQuantity;
  } else {
    updatePacked[uniqueId] = {
      quantity,
      price,
      weight,
      name,
      returnQuantity: 1,
      refund: price,
      totalWeight: weight,
    };
  }
  return updatePacked;
};

const processReturnData = (updatePacked) =>
  Object.entries(updatePacked).reduce(
    (acc, [k, v]) => {
      if (v?.returnQuantity) {
        acc.returnQuantity += v.returnQuantity;
        acc.refund += v.refund;
        acc.totalWeight += v.totalWeight;
      }
      return acc;
    },
    {
      returnQuantity: 0,
      refund: 0,
      totalWeight: 0,
      labelSent: false,
      refundIssued: false,
    }
  );

export default OrderItems;
