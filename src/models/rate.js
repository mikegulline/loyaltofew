import mongoose from 'mongoose';

const rateSchema = new mongoose.Schema(
  {
    cost: {
      type: Number,
    },
    description: {
      type: String,
    },
    rate_id: {
      type: String,
      unique: true,
    },
    shipment_id: {
      type: String,
    },
    orderToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Rate = mongoose.models.Rate || mongoose.model('Rate', rateSchema);

export default Rate;
