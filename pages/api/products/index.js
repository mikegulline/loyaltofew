import { newStore } from '../../../data/store';

const handler = (req, res) => {
  res.status(200).json(newStore());
};

export default handler;
