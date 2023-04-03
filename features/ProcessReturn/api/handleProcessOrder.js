import axios from 'axios';

const handleProcessOrder = async (token, update) => {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/orders/${token}`,
      update
    );
    return data;
  } catch (errors) {
    console.log({ update, errors });
  }
};

export default handleProcessOrder;
