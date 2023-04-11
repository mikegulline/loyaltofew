import mongoose from 'mongoose';

const returnSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'Please enter your name.',
    },
    email: {
      type: String,
      required: 'Please enter your email address.',
      trim: true,
    },
    invoice: {
      type: String,
    },
    message: {
      type: String,
      required: 'What can we help you with today?',
    },
    status: {
      type: String,
      default: 'NEW',
    },
  },
  {
    timestamps: true,
  }
);

const Return = mongoose.models.Return || mongoose.model('Return', returnSchema);

export default Return;
