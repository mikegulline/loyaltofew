// import { getStore } from '@/data/storeModals';

// const handler = (req, res) => {
//   res.status(200).json(getStore());
// };

// export default handler;

import storeNew from '@/public/data/store-new.json';

const handler = (req, res) => {
  res.status(200).json(storeNew);
};

export default handler;
