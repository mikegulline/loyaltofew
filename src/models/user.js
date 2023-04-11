import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'Please enter your name.',
    },
    email: {
      type: String,
      required: 'Please enter your email address.',
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: 'Please enter a password.',
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
