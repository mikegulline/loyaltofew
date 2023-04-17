import nc from 'next-connect';
import api from '@/utils/easyPostApi';
import emailTemplate from '@/email/emailTemplate';
import Return from '@/models/return';
import db from '@/utils/db';

const handler = nc();

handler.post(async (req, res) => {
  const {
    invoice_number,
    email,
    returnItems,
    returnData: { refund },
  } = req.body;

  // buy return label and prepare vars
  const shippingInfo = await getShipping(req);

  const { label_url, carrier } = shippingInfo;

  // send email
  sendStartReturnEmail(
    email,
    invoice_number,
    label_url,
    carrier,
    refund,
    returnItems
  );

  // update mongo
  await updateReturnsDB(invoice_number);

  return res.json(shippingInfo);
});

////////////////////////
// helper funcitions
////////////////////////

async function updateReturnsDB(invoice_number) {
  try {
    const filter = { invoiceNumber: invoice_number };
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

function sendStartReturnEmail(
  email,
  invoice_number,
  label_url,
  carrier,
  refund,
  returnItems
) {
  const items = getItemsToReturn(returnItems);
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_FULL_API);
  const msg = {
    to: email,
    from: process.env.RETURNS_EMAIL,
    subject: `LTF: Returns (${invoice_number})`,
    text: textEmail(carrier, invoice_number, refund, label_url),
    html: htmlEmail(carrier, invoice_number, refund, label_url, items),
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

function textEmail(carrier, invoice_number, refund, label_url) {
  return `Return started  (${invoice_number})

  Sorry to hear you are not 100% satisfied with your order.
  
  Please follow the instructions below to return your items.
  
  Instructions:
  
  1.) Use the URL below to print the return shipping label.
  2.) Tape the return shipping label over the original shipping label.
  3.) Pack and seal the original shipping container with the return items. 
  4.) Drop off the package at your local ${carrier} store.
  
  Once the items have been received, we will issue a refund for $${refund.toFixed(
    2
  )}.
      
  We will notify you by email when your refund has been issued.
  
  Thank you for being a loyal customer,
  Matt Sagoian
  Owner, Loyal To Few
  
  Shipping Label URL: ${label_url}`;
}

function htmlEmail(carrier, invoice_number, refund, label_url, items) {
  const body = `
  <h2>Return started (${invoice_number})</h2>
  Sorry to hear you are not 100% satisfied with your order.</p>
  <p>Please follow the instructions below to return your items.</p>
  <p><strong>Instructions:</strong></p>
  <ol>
  <li>Find and print the return shipping label attached.</li>
  <li>Tape the return shipping label over the original shipping label.</li>
  <li>Pack and seal the original shipping container with the items listed below.</li> 
  <li>Drop off the package at your local ${carrier} store.</li>
  </ol>
  <p>Once the items have been received, we will issue a refund for $${refund.toFixed(
    2
  )}.</p>
  <p>We will notify you by email when your refund has been issued.</p>
  ${items}
  <p>Thank you for being a loyal customer,<br/>Matt Sagoian<br/>Owner, Loyal To Few</p>
  <p>If you are having trouble finding the shipping label in this email, please <a href="${label_url}">click here to view your shipping label online</a>.</p>
  <center><a href="${label_url}"><img src="${label_url}" alt="shipping label" style="width: 350px; max-width: 100%; height: auto" /></a></center>`;
  return emailTemplate(body);
}

async function getShipping(req) {
  const { parcel, to_address, from_address } = req.body;
  const shipment = new api.Shipment({
    parcel,
    to_address: from_address,
    from_address: to_address,
  });
  const { rates } = await shipment.save();
  const rate = rates.sort((a, b) => Number(a.rate) - Number(b.rate))[0];
  const shipping = await shipment.buy(rate.id);
  const tracking = await api.Tracker.retrieve(shipping.tracker.id);
  console.log('shipping purchased');

  return {
    label_url: shipping.postage_label.label_url,
    label_size: shipping.postage_label.label_size,
    tracking_url: tracking.public_url,
    tracking_number: shipping.tracking_code,
    tracker_id: shipping.tracker.id,
    shipment_id: shipping.selected_rate.shipment_id,
    service: shipping.selected_rate.service,
    carrier: shipping.selected_rate.carrier,
    carrier_account_id: shipping.selected_rate.carrier_account_id,
    rate_id: rate.id,
    rate: shipping.selected_rate.rate,
  };
}

export default handler;
