import nc from 'next-connect';
import mail from '@/utils/mail';
import getTokenByTrackingId from '@/utils/getTokenByTrackingId';
import getOrderByToken from '@/utils/getOrderByToken';
import handleProcessOrder from '@/utils/handleProcessOrder';

const handler = nc();

handler.post(async (req, res) => {
  const prevStatus = req.body?.previous_attributes?.status;
  const resultStatus = req.body?.result.status;
  const id = req.body?.result?.id;
  let shipped = false;
  let delivered = false;

  if (resultStatus === 'unknown') {
    return res.status(200).json({ message: 'prev unknown' });
  }
  if (resultStatus === 'pre_transit') {
    return res.status(200).json({ message: 'pre_transit' });
  }
  if (resultStatus === 'out_for_delivery') {
    return res.status(200).json({ message: 'out_for_delivery' });
  }
  if (resultStatus === 'in_transit') {
    shipped = true;
  }
  if (resultStatus === 'delivered') {
    delivered = true;
  }

  if (shipped || delivered) {
    // get order token info from sc
    const { orderToken, error } = await getTokenByTrackingId(id);
    // return if error
    if (error) {
      return res.status(500).json({ error });
    }
    // get order by order toke
    const { order, error: tokenError } = await getOrderByToken(orderToken);

    if (shipped && order.status === 'Shipped') {
      return res.status(200).json({ message: 'already shipped' });
    }

    if (delivered && order.status === 'Delivered') {
      return res.status(200).json({ message: 'already delivered' });
    }

    // default Shipped values
    // overide later if Delivered
    let status = 'Shipped';
    let subject = 'Your order has shipped';
    let message = `
    <p>${order.billingAddressName},</p>
    
    <p>Great news! Your Loyal to Few order has been shipped.</p>
    
    <p>You can track your shipment status here <a href="${public_url}">${public_url}</a></p>
    
    <p>Loyal to Few</p>
      `;

    if (delivered) {
      status = 'Delivered';
      subject = 'Your order was delivered';
      message = `
    <p>${order.billingAddressName},</p>
    
    <p>Your Loyal to Few order has been delivered!</p>
    
    <p>We hope you enjoy your new gear.</p>
    
    <p>Be sure you let your friends your are Loyal to Few.</p>
    
    <p>Loyal to Few</p>
      `;
    }

    // define sc update
    const update = {
      status,
      metadata: {
        ...order.metadata,
        status,
      },
    };
    // update sc by order token
    await handleProcessOrder(orderToken, update);

    // send email
    await mail(order.email, subject, message);
    await mail('mike@mikegulline.com', subject, message);

    return res.status(200).json({ message: status });
  }

  // respond to easypost
  return res.status(200).json({ message: 'check' });
});

export default handler;

///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////

// const snipcartStatus = {
//   InProgress: 'shopping on site',
//   Processed: 'order placed',
//   Pending: 'order packed and ready for delievery',
//   Shipped: 'order shipped',
//   Delivered: 'order delivered',
//   // Disputed: '',
//   // Cancelled: ''
// };
