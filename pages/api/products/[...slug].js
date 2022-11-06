import { newStore } from '../../../data/storeModals';

const handler = (req, res) => {
  const slug = req.query.slug;
  switch (slug.length) {
    case 1:
      res.status(200).json(newStore(slug[0]));
      break;
    case 2:
      res.status(200).json(newStore(slug[0], slug[1]));
      break;
    case 3:
      res.status(200).json(newStore(slug[0], slug[1], slug[2]));
      break;
    case 4:
      res.status(200).json(newStore(slug[0], slug[1], slug[2], slug[3]));
      break;
    default:
      console.log('Error 404');
  }
};

export default handler;
