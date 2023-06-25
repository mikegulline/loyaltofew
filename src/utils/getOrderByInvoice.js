// (GET) get order by invoiceNumber
import getTokenByInvoiceNumber from '@/utils/getTokenByInvoiceNumber';
import getOrderByToken from '@/utils/getOrderByToken';

const getOrderByInvoice = async (invoiceNumber) => {
  try {
    const { orderToken, error } = await getTokenByInvoiceNumber(invoiceNumber);
    if (error) throw 'Error getting orderToken by invoiceNumber';

    const { order, error: tokenError } = await getOrderByToken(orderToken);
    if (tokenError) throw 'Error getting order by orderToken';

    return { order, error: null };
  } catch (error) {
    return { error, order: null };
  }
};

export default getOrderByInvoice;
