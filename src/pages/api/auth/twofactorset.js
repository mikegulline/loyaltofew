import nc from 'next-connect';
import db from '@/utils/db';
import User from '@/models/user';
import TwoFactorToken from '@/models/twofactortoken';
import { validateEmail } from '@/utils/validation';
import mail from '@/utils/mail';
import makeId from '@/utils/makeId';

const handler = nc();

handler.post(async (req, res) => {
  const { email } = req.body;

  // !has email
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: 'Please enter a valid email.' });
  }
  // !has valid email
  if (!validateEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email.' });
  }
  // continue if has valid email
  try {
    await db.connectDB();
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email.' });

    //found user
    //delete any tokens by user._id
    await TwoFactorToken.deleteMany({ user: user._id });
    //create 5 dig code
    const token = makeId(5);
    //save code to mongo
    const newToken = new TwoFactorToken({
      token,
      user: user._id, // Reference to the user's ID
    });
    await newToken.save();
    //send email with code
    const subject = `Secure login initiated.`;
    const message = `
      <h1>Secure Login Initiated</h1>
      <p>Token: <strong>${token}</strong></p>
      <p>Please enter this login Token to contine signing in.</p>
      <p>Note: This token will expire in 5 minutes.</p>
      <p>If you did not initiate this secure login, please contact your admin ASAP.</p>
      <p>Loyal to Few®</p>
  `;
    //////////////////////
    //////////////////////
    //////////////////////
    //////////////////////
    //////////////////////
    //////////////////////
    //////////////////////
    await mail(email, subject, message);

    //return instructions
    return res
      .status(200)
      .json({ success: true, message: `Secure token sent to ${email}.` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  } finally {
    await db.disconnectDB();
  }
});

export default handler;
