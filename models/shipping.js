import mongoose from 'mongoose';

const shippingSchema = new mongoose.Schema({
  rates: [
    {
      cost: {
        type: Number,
      },
      description: {
        type: String,
      },
      guaranteedDaysToDelivery: {
        type: Number,
      },
    },
  ],
});

const Shipping =
  mongoose.models.Shipping || mongoose.model('Shipping', shippingSchema);

export default Shipping;
