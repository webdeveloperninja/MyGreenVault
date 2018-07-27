import { model, Schema } from 'mongoose';

const plantSchema = new Schema(
  {
    plantName: {
      type: String,
      required: true
    },
    plantNumber: {
      type: String,
      required: true
    },
    plantDescription: {
      type: String,
      required: true
    },
    plantStatus: {
      type: Number,
      required: true
    },
    roomType: {
      type: Number,
      required: true
    },
    medium: {
      type: Number,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    profileImages: {
      type: Array,
      required: false
    }
  },
  {
    collection: 'plant'
  }
);

export const Plant = model('Plant', plantSchema);
