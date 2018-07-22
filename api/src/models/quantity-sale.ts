import { model, Schema } from 'mongoose';

const quantitySale = new Schema(
  {
    isQuantity: {
      type: Boolean,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    plantId: {
      type: String,
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: false
    },
    phone: {
      type: Number,
      required: false
    },
    email: {
      type: String,
      required: false
    },
    userId: {
      type: String,
      required: true
    }
  },
  {
    collection: 'sales'
  }
);

export const QuantitySale = model('QuantitySale', quantitySale);
