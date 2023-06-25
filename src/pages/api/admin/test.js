import nc from 'next-connect';
import updateOrderByToken from '@/utils/updateOrderByToken';
import getOrderByInvoice from '@/utils/getOrderByInvoice';

const handler = nc();

handler.get(async (req, res) => {
  const invoiceNumber = 'LTF1022';

  const { order, error } = await getOrderByInvoice(invoiceNumber);

  const orderToken = order.token;

  const updatedOrder = await updateOrderByToken(orderToken, {
    ...order,
    metadata: {
      ...order.metadata,
      print_packing_slip: !order.metadata?.print_packing_slip,
    },
  });

  res.status(200).json({ updatedOrder, error, order });
});

export default handler;
