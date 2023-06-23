import Order from '@/models/order';
import db from '@/utils/db';
import mail from '@/utils/mail';

export default async function handler(req, res) {
  const today = new Date();
  const hours = today.getHours();
  const canRun = hours === 11;

  if (!process.env.CHRON) return res.status(200).json({ message: 'no chron' });

  if (!canRun) return res.status(200).json({ message: 'bad time', hours });

  let subject, message;
  try {
    await db.connectDB();

    const previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 1);

    const orders = await Order.find({
      createdAt: { $gte: previousDay },
    }).exec();

    if (!orders.length) {
      subject = `LTF Inventory Update`;
      message = `<p>No orders in the past 24hrs :(</p>
      <p>Let's fix that!</p>
      <p>LTF Robot</p>
      `;

      // await mail(process.env.RETURNS_EMAIL, subject, message);
      await mail('mike@mikegulline.com', subject, message);

      return res.status(200).json({ message: 'update sent' });
    }

    const returnOrders = {};
    let countOrders = 0;

    orders.map(({ items }) => {
      items.map(({ baseId, quantity }) => {
        countOrders += quantity;
        if (baseId in returnOrders) {
          returnOrders[baseId] += quantity;
        } else {
          returnOrders[baseId] = quantity;
        }
      });
    });

    let htmlOrders = '';

    for (const key in returnOrders) {
      htmlOrders += `<p> - (${returnOrders[key]}) ${key}</p>`;
    }

    subject = `LTF Inventory Update`;
    message = `<p>You got ${countOrders} orders in the past 24hrs!</p>
    <p><strong>Time to place an order for:</strong></p>
    ${htmlOrders}
    <p>Keep it up, Champ!</p>
    <p>LTF Robot</p>
    `;

    // await mail(process.env.RETURNS_EMAIL, subject, message);
    await mail('mike@mikegulline.com', subject, message);

    return res.status(200).json({ message: 'update sent' });
  } catch (error) {
    return res.status(500).json(error);
  } finally {
    await db.disconnectDB();
  }
}
