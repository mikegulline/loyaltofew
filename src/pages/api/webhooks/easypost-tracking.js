import nc from 'next-connect';
import mail from '@/utils/mail';

const handler = nc();

handler.post(async (req, res) => {
  await mail(req, 'easypost-tracking.js');

  res.status(200).json({ message: 'check' });
});

export default handler;
