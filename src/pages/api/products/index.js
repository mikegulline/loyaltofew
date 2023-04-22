import { getStore } from '@/data/storeModals';

const handler = (req, res) => {
  res.status(200).json(getStore());
};

export default handler;

// old handler
// import { getStore } from '@/data/storeModals';

// const handler = (req, res) => {
//   res.status(200).json(getStore());
// };

// export default handler;
