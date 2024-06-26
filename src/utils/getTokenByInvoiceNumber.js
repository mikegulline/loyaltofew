import Order from '@/models/order';
import db from '@/utils/db';

const getTokenByInvoiceNumber = async (invoiceNumber) => {
  const findOrder = { invoiceNumber: invoiceNumber.toUpperCase() };
  try {
    await db.connectDB();
    const order = await Order.findOne(findOrder, 'orderToken').exec();
    await db.disconnectDB();
    console.log(order);
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

export default getTokenByInvoiceNumber;
