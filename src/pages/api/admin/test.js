import nc from 'next-connect';
import getOrderByToken from '@/utils/getOrderByToken';
import getTokenByInvoiceNumber from '@/utils/getTokenByInvoiceNumber';

const handler = nc();

handler.get(async (req, res) => {
  const invoiceNumber = 'LTF1017';
  const { orderToken, error: invoiceError } = await getTokenByInvoiceNumber(
    invoiceNumber
  );
  const { order, error: tokenError } = await getOrderByToken(orderToken);

  res.status(200).json({ invoiceError, tokenError, order });
});

// handler.get(async (req, res) => {
//   const token = 'bb45f8cc-6ac9-4ae7-b21e-4d15b2993297';

//   const { error, order } = await getOrderByToken(token);

//   res.status(200).json({ error, order });
// });

export default handler;
