import mongoose from 'mongoose';

const twoFactorTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const TwoFactorToken =
  mongoose.models.TwoFactorToken ||
  mongoose.model('TwoFactorToken', twoFactorTokenSchema);

export default TwoFactorToken;
