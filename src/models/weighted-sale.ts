import { model, Schema } from 'mongoose';

const weightedSale = new Schema(
  {
    isQuantity: {
      type: Boolean,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    plantNumber: {
      type: Number,
      required: true
    },
    unit: {
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

export const WeightedSale = model('WeightedSale', weightedSale);
