import mongoose from 'mongoose';

const mailSchema = new mongoose.Schema(
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

const Mail = mongoose.models.Mail || mongoose.model('Mail', mailSchema);

export default Mail;
