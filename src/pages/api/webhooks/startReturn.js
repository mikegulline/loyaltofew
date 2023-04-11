import nc from 'next-connect';
import api from '@/utils/easyPostApi';
import getRates from '@/utils/getRates';

const handler = nc();

handler.post(async (req, res) => {
  let shipping;
  let tracking;

  // 1. get rates
  const isReturn = true;
  const { rates, errors } = await getRates(req.body, isReturn);

  if (errors) {
    return res.status(500).json({ message: 'error getting rates', errors });
  }

  // 2. buy rate
  try {
    const shipment = await api.Shipment.retrieve(rates[0].shipment_id);

    shipping = await shipment.buy(rates[0].rate_id);
  } catch (errors) {
    return res.status(500).json({ message: 'shipping errors', errors });
  }

  // 3 get tracking
  try {
    tracking = await api.Tracker.retrieve(shipping.tracker.id);
  } catch (errors) {
    return res
      .status(500)
      .json({ message: 'error getting tracking url', errors });
  }

  const sendInfos = {
    trackingUrl: tracking.public_url,
    trackingNumber: shipping.tracking_code,
    shipment_id: shipping.selected_rate.shipment_id,
    trackerId: shipping.tracker.id,
    rate_id: shipping.postage_label.id,
    rate: shipping.selected_rate.rate,
    label_url: shipping.postage_label.label_url,
    label_size: shipping.postage_label.label_size,
  };

  // 4 update mongodb mail

  // 5. email lable to customer

  // 6. return label and tracking infos
  console.log(sendInfos);
  return res.json(sendInfos);
});

export default handler;
