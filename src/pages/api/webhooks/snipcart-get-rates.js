// Snipcart shipping calculator
// check for saved rates and return
// if none
// connect to Easypost for rates
// save returned rates
// return rates

import nc from 'next-connect';
import getRates from '@/utils/getRates';
import db from '@/utils/db';
import Rate from '@/models/rate';

const handler = nc();

handler.post(async (req, res) => {
  const token = req?.body?.content?.token;

  try {
    // open db once and close in finally
    await db.connectDB();

    // 1. check for saved rates and send
    try {
      const hasRates = await Rate.find({
        orderToken: token,
      }).exec();
      if (hasRates?.length) return res.json({ rates: hasRates });
    } catch (errors) {
      return res.status(500).json({ message: 'error finding rates', errors });
    }

    // 2. get rates if none found
    const { rates, errors } = await getRates(req.body);

    // 3. return errors or none found if problem
    if (errors) {
      return res.status(500).json({ message: 'error getting rates', errors });
    }
    if (!rates?.length) {
      return res
        .status(500)
        .json({ message: 'error getting rates (no rates)', rates });
    }

    // 4. save returned rates to db
    try {
      await Rate.insertMany(rates);
    } catch (errors) {
      return res.status(500).json({ message: 'error saving rates', errors });
    }

    // 5. return rates
    return res.json({ rates });
  } finally {
    await db.disconnectDB();
  }
});

export default handler;
