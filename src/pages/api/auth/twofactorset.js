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

    if (!user) {
      await db.disconnectDB();
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email.' });
    }

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
    
    try {
      await mail(email, subject, message);
    } catch (emailError) {
      // If email fails, delete the token we just created
      await TwoFactorToken.deleteMany({ user: user._id });
      console.error('Failed to send 2FA email:', {
        message: emailError?.message,
        email,
        userId: user._id,
        sendGridError: emailError?.response?.body,
      });
      await db.disconnectDB();
      // Don't expose the actual error to the user, just log it
      return res.status(500).json({
        success: false,
        message: 'Failed to send confirmation email. Please try again or contact support.',
      });
    }

    //return instructions
    await db.disconnectDB();
    return res
      .status(200)
      .json({ success: true, message: `Secure token sent to ${email}.` });
  } catch (error) {
    console.error('twofactorset.js error:', error);
    // Make sure db is disconnected even on error
    try {
      await db.disconnectDB();
    } catch (dbError) {
      console.error('Error disconnecting DB:', dbError);
    }
    return res.status(500).json({ 
      success: false, 
      message: error?.message || 'An error occurred. Please try again.' 
    });
  }
});

export default handler;
