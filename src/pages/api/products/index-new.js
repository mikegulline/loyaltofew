import store from '@/public/data/store.json';

const handler = (req, res) => {
  res.status(200).json(store);
};

export default handler;
