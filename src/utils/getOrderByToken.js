import axios from 'axios';

const getOrderByToken = async (token) => {
  const apiEndPoint = `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/order-by-token/${token}`;
  try {
    const { data } = await axios.get(apiEndPoint);
    return data;
  } catch (error) {
    return { error, order: null };
  }
};

export default getOrderByToken;
