import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderToken: {
      type: 'String',
    },
    invoiceNumber: {
      type: 'String',
    },
    parcel: {
      type: 'String',
    },
    from_address: {
      type: 'String',
    },
    to_address: {
      type: 'String',
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
