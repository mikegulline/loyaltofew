// Get order info from Snipcart by InvoiceNumber
// Used in pages/admin/returns/
import nc from 'next-connect';
import getTokenByInvoiceNumber from '@/utils/getTokenByInvoiceNumber';
import getOrderByToken from '@/utils/getOrderByToken';

const handler = new nc();

// get order info from snipcart by invoice number
handler.get(async (req, res) => {
  try {
    const { invoiceNumber } = req.query;
    const { orderToken, error } = await getTokenByInvoiceNumber(invoiceNumber);
    if (error) throw 'Error getting orderToken by invoiceNumber';

    const { order, error: tokenError } = await getOrderByToken(orderToken);
    if (tokenError) throw 'Error getting order by orderToken';

    return res.status(200).json({ order, error: null });
  } catch (error) {
    return res.status(200).json({ error, order: null });
  }
});

export default handler;
