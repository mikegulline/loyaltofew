import { getStore } from '@/data/storeModals';

const handler = (req, res) => {
  res.status(200).json(getStore());
};

export default handler;
