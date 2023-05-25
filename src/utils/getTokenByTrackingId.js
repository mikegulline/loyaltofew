import Order from '@/models/order';
import db from '@/utils/db';

const getTokenByTrackingId = async (tracker_id) => {
  try {
    await db.connectDB();
    const order = await Order.findOne({ tracker_id }, 'orderToken').exec();
    await db.disconnectDB();

    if (!order) {
      const sendError = {
        orderToken: null,
        error: 'Invoice number not found.',
      };
      return sendError;
    }

    const sendSuccess = { orderToken: order.orderToken, error: null };
    return sendSuccess;
  } catch (error) {
    const sendError = {
      orderToken: null,
      error,
    };
    return sendError;
  }
};

export default getTokenByTrackingId;
