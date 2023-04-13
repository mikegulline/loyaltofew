import nc from 'next-connect';
import api from '@/utils/easyPostApi';
import emailTemplate from '@/email/emailTemplate';
import Return from '@/models/return';
import db from '@/utils/db';

const handler = nc();

handler.post(async (req, res) => {
  // buy return label and prepare vars
  const {
    invoiceNumber,
    email,
    returnItems,
    shippingInfo,
    returnData: { refund },
    shippingInfo: { label_url, carrier },
  } = await getShipping(req);

  // prepare list of return items for email
  const items = getItemsToReturn(returnItems);

  // send email
  sendStartReturnEmail(email, items, label_url, carrier, refund);

  // update mongo
  await updateReturnsDB(invoiceNumber);

  return res.json(shippingInfo);
});

async function updateReturnsDB(invoiceNumber) {
  try {
    const filter = { invoiceNumber };
    const update = { status: 'RETURN STARTED' };
    await db.connectDB();
    await Return.findOneAndUpdate(filter, update);
    await db.disconnectDB();
    console.log('db updated');
  } catch (error) {
    console.log('error in updateReturnsDB()', error);
  } finally {
    return;
  }
}

function getItemsToReturn(returnItems) {
  let items = '';
  for (const key in returnItems) {
    items += `<li>(${returnItems[key].quantity}) <a href="${returnItems[key].url}">${returnItems[key].name}</a></li>`;
  }
  console.log('items prepared');
  return `<p><strong>Items to pack:</strong></p><ul>${items}</ul>`;
}

function sendStartReturnEmail(email, items, label_url, carrier, refund) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_FULL_API);
  const msg = {
    to: email,
    from: 'orders@loyaltofew.com',
    subject: `LTF Returns`,
    text: `Return started.
    
    ${label_url}`,
    html: emailTemplate(`
    <h2>Return started.</h2>
    <p>Sorry to hear you are not 100% satisfied with your order.</p><br />
    <p>Please follow the instructions below to return your items.</p><br />
    <p><strong>Instructions:</strong></p>
    <ol>
    <li>Find and print the return shipping label attached.</li>
    <li>Tape the return shipping label over the original shipping label.</li>
    <li>Pack and seal the original shipping container with the items listed below.</li> 
    <li>Drop off the package at your local ${carrier} store.</li>
    </ol>
    <p>Once the items have been received, we will issue a refund for $${refund.toFixed(
      2
    )}.</p><br />
    <p>We will notify you by email when your refund has been issued</p><br />
    ${items}
    <p>Thank you for being a loyal customer.<br/>Matt Sagoian<br/>Owner, Loyal To Few</p><br />
    <p>If you are having trouble finding the shipping label in this email, please <a href="${label_url}">click here to view your shipping label online</a>.</p><br />
    <p><img src="${label_url}" alt="shipping label" style="width: 350px; height: auto" /></p>
    `),
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error('error in sendStartReturnEmail()', error);
    });
  return;
}

async function getShipping(req) {
  const {
    parcel,
    to_address,
    from_address,
    email,
    invoiceNumber,
    returnItems,
    returnData,
  } = req.body;
  const shipment = new api.Shipment({
    parcel,
    to_address: from_address,
    from_address: to_address,
    is_return: true,
  });
  const { rates } = await shipment.save();
  const rate = rates.sort((a, b) => Number(a.rate) - Number(b.rate))[0];
  const shipping = await shipment.buy(rate.id);
  const tracking = await api.Tracker.retrieve(shipping.tracker.id);
  console.log('shipping purchased');

  const returnInfos = {
    email,
    invoiceNumber,
    returnItems,
    returnData,
    shippingInfo: {
      label_url: shipping.postage_label.label_url,
      label_size: shipping.postage_label.label_size,
      tracking_url: tracking.public_url,
      tracking_number: shipping.tracking_code,
      tracker_Id: shipping.tracker.id,
      shipment_id: shipping.selected_rate.shipment_id,
      service: shipping.selected_rate.service,
      carrier: shipping.selected_rate.carrier,
      carrier_account_id: shipping.selected_rate.carrier_account_id,
      rate_id: rate.id,
      rate: shipping.selected_rate.rate,
    },
  };
  return returnInfos;
}

export default handler;
