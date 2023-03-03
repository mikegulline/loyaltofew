import axios from 'axios';

const processOrder = async (token, update) => {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/orders/${token}`,
      update
    );
    console.log('response', data);
  } catch (errors) {
    console.log({ message: 'set status shipped', errors });
  }
};

export default processOrder;
