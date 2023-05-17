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
import mailError from '@/utils/mailError';

const handler = nc();

handler.post(async (req, res) => {
  const token = req?.body?.content?.token;
  const email = req?.body?.content?.email;

  try {
    // open db once and close in finally
    await db.connectDB();

    // 1. check for saved rates and send
    try {
      const hasRates = await Rate.find({
        orderToken: token,
      }).exec();
      if (hasRates?.length) return res.json({ rates: hasRates });
    } catch (error) {
      throw { message: 'error finding rates', error };
    }

    // 2. get rates if none found
    const { rates, error } = await getRates(req.body);

    // 3. return error or none found if problem
    if (error) {
      throw { message: 'error getting rates', error };
    }
    if (!rates?.length) {
      throw { message: 'error getting rates (no rates)', rates };
    }

    // 4. save returned rates to db
    try {
      await Rate.insertMany(rates);
    } catch (error) {
      throw { message: 'error saving rates', error };
    }

    // 5. return rates
    return res.json({ rates });
  } catch (error) {
    await mailError(error, 'snipcart-get-rates.js', token, email);
    return res.status(500).json({ error });
  } finally {
    await db.disconnectDB();
  }
});

export default handler;
