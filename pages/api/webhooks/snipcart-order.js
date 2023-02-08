import nc from 'next-connect';

const handler = nc();

nc.post(async (req, res) => {
  try {
  } catch (error) {
    res.json(error);
  }
  const { complete } = req.body;
});

export default handler;
