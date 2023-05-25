import nc from 'next-connect';
import mail from '@/utils/mail';
import getTokenByTrackingId from '@/utils/getTokenByTrackingId';
import getOrderByToken from '@/utils/getOrderByToken';

const handler = nc();

handler.post(async (req, res) => {
  const {
    description,
    result: {
      id,
      status,
      status_detail,
      est_delivery_date,
      tracking_details,
      public_url,
    },
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
    const noStatus = statusArray.indexOf(status) == -1;
    if (noStatus) return res.status(200).json({ message: 'continue' });
    //return if no tracking details
    const noTracking = !tracking_details.length;
    if (noTracking) return res.status(200).json({ message: 'continue' });

    const info = tracking_details[tracking_details.length - 1];

    const desc = info.description
      ? `

${info.description}`
      : '';

    const message = `
LTF Order Update for ${order.email}

${info.message}${desc}

You can track your shipment status here <a href="${public_url}">${public_url}</a>

Loyal to Few
    `;

    await mail(message, 'easypost-tracking.js');
  }

  res.status(200).json({ message: 'check' });
});

export default handler;
