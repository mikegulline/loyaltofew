import axios from 'axios';
 
export default async function apiOrders(status, limit, offset) {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/orders`,
      {
        params: {
          status,
          limit,
          offset,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(
      JSON.stringify({
        message: `Error getting orders in api-orders.js (status: ${status}, limit: ${limit}, offset: ${offset})`,
        error,
      })
    );
  }
  return null;
}
