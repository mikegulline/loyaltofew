// (GET) get order by orderToken
// api/order/get-order/[orderToken].js
import axios from 'axios';

const getOrderByToken = async (orderToken) => {
  const apiEndPoint = `${process.env.NEXT_PUBLIC_BASE_URL}api/order/get-order/${orderToken}`;
  try {
    const { data } = await axios.get(apiEndPoint);
    return data;
  } catch (error) {
    return { error, order: null };
  }
};

export default getOrderByToken;
