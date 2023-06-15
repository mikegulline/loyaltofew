import nc from 'next-connect';
import mail from '@/utils/mail';
import getTokenByTrackingId from '@/utils/getTokenByTrackingId';
import getOrderByToken from '@/utils/getOrderByToken';
import handleProcessOrder from '@/utils/handleProcessOrder';

const handler = nc();

handler.post(async (req, res) => {
  const {
    previous_attributes,
    result: { id, status: currentStatus, public_url },
  } = req.body;

  // status types
  const noStatus = !previous_attributes?.status;

  const isShipped =
    (previous_attributes.status === 'unknown' ||
      previous_attributes.status === 'pre_transit') &&
    currentStatus === 'in_transit';

  const isOutForDelivery =
    (previous_attributes.status === 'in_transit' ||
      previous_attributes.status === 'pre_transit') &&
    currentStatus === 'out_for_delivery';

  const isDelivered =
    (previous_attributes.status === 'out_for_delivery' ||
      previous_attributes.status === 'in_transit') &&
    currentStatus === 'delivered';

  // act on status
  if (noStatus) {
    return res.status(200).json({ message: 'nothing to do' });
  }

  if (isOutForDelivery) {
    return res.status(200).json({ message: 'nothing to do' });
  }

  if (isShipped || isDelivered) {
    // get order token info from sc
    const { orderToken, error } = await getTokenByTrackingId(id);
    // return if error
    if (error) {
      return res.status(500).json({ error });
    }
    // get order by order toke
    const { order, error: tokenError } = await getOrderByToken(orderToken);

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

    if (isDelivered) {
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
  }

  // respond to easypost
  res.status(200).json({ message: 'check' });
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
