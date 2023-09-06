import nc from 'next-connect';
import api from '@/utils/easyPostApi';

const handler = nc();

handler.get(async (req, res) => {
  const { tracker_id } = req.query;
  console.log(req);
  try {
    const tracking = await api.Tracker.retrieve(tracker_id);
    res.status(200).json({ tracking });
  } catch (error) {
    res.status(404).json({ error, message: 'Tracking ID not found.' });
  }
});

export default handler;

// const trackingAPIResponse = {
//   tracking: {
//     id: 'trk_4550fbba2baf4b968256eb57ea716cbc',
//     object: 'Tracker',
//     mode: 'production',
//     tracking_code: '9434636105440268209226',
//     status: 'pre_transit',
//     shipment_id: 'shp_e6702dc41c154a49b970325daea6e45e',
//     carrier: 'USPS',
//     tracking_details: [
//       {
//         object: 'TrackingDetail',
//         message: 'Shipping Label Created, USPS Awaiting Item',
//         description:
//           'August 25 5:00 am Shipping Label Created, USPS Awaiting Item in SAN LUIS REY, CA',
//         status: 'pre_transit',
//         status_detail: 'label_created',
//         datetime: '2023-08-25T05:00:00+00:00',
//         source: 'USPS',
//         carrier_code: 'GX',
//         tracking_location: {
//           object: 'TrackingLocation',
//           city: 'SAN LUIS REY',
//           state: 'CA',
//           country: null,
//           zip: '92068',
//         },
//       },
//     ],
//     carrier_detail: {
//       object: 'CarrierDetail',
//       service: 'USPS Ground Advantage',
//       container_type: null,
//       est_delivery_date_local: null,
//       est_delivery_time_local: null,
//       origin_location: 'SAN LUIS REY CA, 92068',
//       origin_tracking_location: {
//         object: 'TrackingLocation',
//         city: 'SAN LUIS REY',
//         state: 'CA',
//         country: null,
//         zip: '92068',
//       },
//       destination_location: 'LAS VEGAS NV, 89141',
//       destination_tracking_location: null,
//       guaranteed_delivery_date: null,
//       alternate_identifier: null,
//       initial_delivery_attempt: null,
//     },
//     public_url:
//       'https://track.easypost.com/djE6dHJrXzQ1NTBmYmJhMmJhZjRiOTY4MjU2ZWI1N2VhNzE2Y2Jj',
//     fees: [],
//     created_at: '2023-08-25T05:00:57Z',
//     updated_at: '2023-08-25T15:02:05Z',
//   },
// };
