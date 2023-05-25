import nc from 'next-connect';
import mail from '@/utils/mail';
import getTokenByTrackingId from '@/utils/getTokenByTrackingId';
import getOrderByToken from '@/utils/getOrderByToken';
import handleProcessOrder from '@/utils/handleProcessOrder';

const handler = nc();

handler.post(async (req, res) => {
  const {
    result: { id, status: currentStatus, tracking_details, public_url },
  } = req.body;

  // get SC order token from Mongo by Tracking Id
  const { orderToken, error } = await getTokenByTrackingId(id);

  if (error) {
    return res.status(200).json({ error });
  }

  const { order, error: tokenError } = await getOrderByToken(orderToken);

  if (order) {
    const statusArray = [
      'pre_transit',
      'in_transit',
      'out_for_delivery',
      'delivered',
    ];

    //return if bad status
    const noStatus = statusArray.indexOf(currentStatus) == -1;
    if (noStatus) return res.status(200).json({ message: 'continue' });
    //return if no tracking details
    const noTracking = !tracking_details.length;
    if (noTracking) return res.status(200).json({ message: 'continue' });

    //updated status in SC
    const inTransit =
      currentStatus === 'in_transit' && order.status === 'Pending';
    if (currentStatus === 'delivered' || inTransit) {
      const status = inTransit ? 'Shipped' : 'Delivered';
      const update = {
        status,
        metadata: {
          ...order.metadata,
          status,
        },
      };
      await handleProcessOrder(orderToken, update);
    }

    const message = mailMessage(order, tracking_details, public_url);

    await mail(message, 'easypost-tracking.js');
  }

  res.status(200).json({ message: 'check' });
});

//////////////////////
//////////////////////
//////////////////////
//////////////////////
const mailMessage = (order, tracking_details, public_url) => {
  const info = tracking_details[tracking_details.length - 1];

  const desc = info.description
    ? `

${info.description}`
    : '';

  return `
LTF Order Update for ${order.email}

${info.message}${desc}

You can track your shipment status here <a href="${public_url}">${public_url}</a>

Loyal to Few
  `;
};

export default handler;
