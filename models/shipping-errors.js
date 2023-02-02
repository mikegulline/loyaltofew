import mongoose from 'mongoose';

const shippingErrorsSchema = new mongoose.Schema({
  errors: [
    {
      key: {
        type: String,
      },
      message: {
        type: String,
      },
    },
  ],
});

const ShippingErrors =
  mongoose.models.ShippingErrors ||
  mongoose.model('ShippingErrors', shippingErrorsSchema);

export default ShippingErrors;
