import axios from 'axios';

const handleProcessOrder = async (token, update, ship = null) => {
  let apiEndPoint = `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/order/${token}`;
  if (ship)
    apiEndPoint = `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/order/${token}?ship=true`;
  try {
    const { data } = await axios.put(apiEndPoint, update);
    return data;
  } catch (errors) {
    console.log({ update, errors });
  }
};

export default handleProcessOrder;
