// (PUT) update order by orderToken
// api/order/put-order/[orderToken].js
import axios from 'axios';

const updateOrderByToken = async (orderToken, update) => {
  const apiEndPoint = `${process.env.NEXT_PUBLIC_BASE_URL}api/order/put-order/${orderToken}`;
  try {
    const { data } = await axios.put(apiEndPoint, update);
    return data;
  } catch (error) {
    return { error, order: null };
  }
};

export default updateOrderByToken;
