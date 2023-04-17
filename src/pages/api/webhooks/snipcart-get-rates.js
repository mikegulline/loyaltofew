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
  console.log('test1');
  // 1. check for saved rates and send
  try {
    console.log('test2');
    await db.connectDB();
    console.log('test3');
    const hasRates = await Rate.find({
      orderToken: token,
    }).exec();
    console.log('test4');
    await db.disconnectDB();
    console.log('test5');
    if (hasRates?.length) return res.json({ rates: hasRates });
  } catch (errors) {
    return res.status(500).json({ message: 'error finding rates', errors });
  }

  // 2. get rates if none found
  console.log('test6');
  const { rates, errors } = await getRates(req.body);

  // 3. return errors if found
  if (errors) {
    console.log('test7');
    return res.status(500).json({ message: 'error getting rates', errors });
  }

  // 4. save returned rates
  try {
    console.log('test8');
    await db.connectDB();
    console.log('test9');
    await Rate.insertMany(rates);
    console.log('test10');
    await db.disconnectDB();
  } catch (errors) {
    return res.status(500).json({ message: 'error saving rates', errors });
  }

  // 5. return rates
  return res.json({ rates });
});

export default handler;
