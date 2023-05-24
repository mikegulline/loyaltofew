import nc from 'next-connect';
import mailError from '@/utils/mailError';
import Order from '@/models/order';
import db from '@/utils/db';

// https://www.loyaltofew.com/api/webhooks/easypost-tracking

const handler = nc();

handler.post(async (req, res) => {
  // const { id, object, status, tracking_details } = req.body;

  // if (tracking_details?.length === 1) {
  //   const orderToken = getOrderToken(id);
  // }

  // if (status === 'out_for_delivery') {
  // }

  // if (status === 'delivered') {
  // }

  await mailError(
    {
      message: 'easypost tracking :' + JSON.stringify({ req }),
      error: 'none',
    },
    'easypost-tracking.js',
    false,
    false,
    false
  );
  res.status(200).json({ message: 'check' });
});

const getOrderToken = async (id) => {
  try {
    await db.connectDB();
    const findOrder = { tracker_id: id };
    const { orderToken } = await Order.findOne(findOrder, 'orderToken').exec();
    return orderToken;
  } catch (error) {
    throw error;
  } finally {
    await db.disconnectDB();
  }
  return null;
};

export default handler;
