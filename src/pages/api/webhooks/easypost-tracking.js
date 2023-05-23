import nc from 'next-connect';
import mailError from '@/utils/mailError';

// https://www.loyaltofew.com/api/webhooks/easypost-tracking

const handler = nc();

handler.post(async (req, res) => {
  await mailError(
    {
      message: 'easypost tracking :' + JSON.stringify(req),
      error: none,
    },
    'easypost-tracking.js',
    false,
    false,
    false
  );
  res.statusCode(200);
});
