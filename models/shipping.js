import mongoose from 'mongoose';

const shippingSchema = new mongoose.Schema({
  id: {
    type: 'String',
  },
  object: {
    type: 'String',
  },
  mode: {
    type: 'String',
  },
  created_at: {
    type: 'Date',
  },
  updated_at: {
    type: 'Date',
  },
  to_address: {
    id: {
      type: 'String',
    },
  },
  from_address: {
    id: {
      type: 'String',
    },
  },
  return_address: {
    id: {
      type: 'String',
    },
  },
  buyer_address: {
    id: {
      type: 'String',
    },
  },
  parcel: {
    id: {
      type: 'String',
    },
  },
  forms: {
    type: 'Array',
  },
  rates: {
    type: ['Mixed'],
  },
  selected_rate: {
    id: {
      type: 'String',
    },
    object: {
      type: 'String',
    },
    created_at: {
      type: 'Date',
    },
    updated_at: {
      type: 'Date',
    },
    mode: {
      type: 'String',
    },
    service: {
      type: 'String',
    },
    carrier: {
      type: 'String',
    },
    rate: {
      type: 'String',
    },
    currency: {
      type: 'String',
    },
    retail_rate: {
      type: 'String',
    },
    retail_currency: {
      type: 'String',
    },
    list_rate: {
      type: 'String',
    },
    list_currency: {
      type: 'String',
    },
    billing_type: {
      type: 'String',
    },
    delivery_days: {
      type: 'Number',
    },
    delivery_date: {
      type: 'Mixed',
    },
    delivery_date_guaranteed: {
      type: 'Boolean',
    },
    est_delivery_days: {
      type: 'Number',
    },
    shipment_id: {
      type: 'String',
    },
    carrier_account_id: {
      type: 'String',
    },
  },
  postage_label: {
    object: {
      type: 'String',
    },
    id: {
      type: 'String',
    },
    created_at: {
      type: 'Date',
    },
    updated_at: {
      type: 'Date',
    },
    date_advance: {
      type: 'Number',
    },
    integrated_form: {
      type: 'String',
    },
    label_date: {
      type: 'Date',
    },
    label_resolution: {
      type: 'Number',
    },
    label_size: {
      type: 'String',
    },
    label_type: {
      type: 'String',
    },
    label_file_type: {
      type: 'String',
    },
    label_url: {
      type: 'String',
    },
    label_pdf_url: {
      type: 'Mixed',
    },
    label_zpl_url: {
      type: 'Mixed',
    },
    label_epl2_url: {
      type: 'Mixed',
    },
    label_file: {
      type: 'Mixed',
    },
  },
  messages: {
    type: 'Array',
  },
  options: {
    currency: {
      type: 'String',
    },
    payment: {
      type: {
        type: 'String',
      },
    },
    date_advance: {
      type: 'Number',
    },
  },
  tracking_code: {
    type: 'String',
  },
  usps_zone: {
    type: 'Number',
  },
  status: {
    type: 'String',
  },
  tracker: {
    id: {
      type: 'String',
    },
  },
  fees: {
    type: ['Mixed'],
  },
});

const Shipping =
  mongoose.models.Shipping || mongoose.model('Shipping', shippingSchema);

export default Shipping;
