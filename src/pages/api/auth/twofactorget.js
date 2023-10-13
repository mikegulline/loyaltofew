import nc from 'next-connect';
import db from '@/utils/db';
import TwoFactorToken from '@/models/twofactortoken';

const handler = nc();

handler.post(async (req, res) => {
  const { token } = req.body;

  // !has token
  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: 'No token attached.' });
  }

  // continue if has valid token
  try {
    await db.connectDB();

    const tokenUser = await TwoFactorToken.findOne({
      token: token.toUpperCase(),
    }).populate('User');

    if (!tokenUser)
      return res
        .status(400)
        .json({ success: false, message: 'Invalid token.' });

    //found user
    //delete any tokens by user._id
    await TwoFactorToken.deleteMany({ user: tokenUser.user._id });
    //return instructions
    return res.status(400).json({ success: true, message: 'Token validated.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  } finally {
    await db.disconnectDB();
  }
});

export default handler;
