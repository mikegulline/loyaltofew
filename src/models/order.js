import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    baseId: {
      type: String,
      required: true,
    },
    uniqueId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPriceWithoutTaxes: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalWeight: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    totalPriceWithoutDiscountsAndTaxes: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const orderSchema = new mongoose.Schema(
  {
    orderToken: {
      type: 'String',
    },
    email: {
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
    tracker_id: {
      type: 'String',
    },
    items: [itemSchema],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
