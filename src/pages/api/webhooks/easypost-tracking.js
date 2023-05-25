import nc from 'next-connect';
import axios from 'axios';
import mail from '@/utils/mail';
import getTokenByTrackingId from '@/utils/getTokenByTrackingId';
import getOrderByToken from '@/utils/getOrderByToken';

const handler = nc();

handler.post(async (req, res) => {
  const {
    description,
    result: { id, status, status_detail, est_delivery_date, tracking_details },
  } = req.body;

  // get SC order token from Mongo by Tracking Id
  const { orderToken, error } = await getTokenByTrackingId(id);

  if (error) {
    await mail(JSON.stringify({ error }), 'easypost-tracking.js');
    return res.status(200).json({ error });
  }

  const { order, error: tokenError } = await getOrderByToken(orderToken);

  await mail(
    JSON.stringify({
      description,
      result: {
        id,
        status,
        status_detail,
        est_delivery_date,
        tracking_details,
        orderToken,
        email: order.email,
      },
    }),
    'easypost-tracking.js'
  );

  res.status(200).json({ message: 'check' });
});

export default handler;
