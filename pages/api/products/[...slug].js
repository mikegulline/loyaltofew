import {
  getCategory,
  getType,
  getLogo,
  getColor,
} from '../../../data/storeModals';

const handler = (req, res) => {
  const slug = req.query.slug;
  let send;
  switch (slug.length) {
    case 1:
      checkSend(res, getCategory(...slug));
      break;
    case 2:
      checkSend(res, getType(...slug));
      break;
    case 3:
      checkSend(res, getLogo(...slug));
      break;
    case 4:
      checkSend(res, getColor(...slug));
      break;
    default:
      console.log('Error 404');
  }
};

const checkSend = (res, send) => {
  if (send) res.status(200).json(send);
  else res.status(404).send([]);
};

export default handler;
