import { model, Schema } from 'mongoose';

const weekSchema = new Schema(
  {
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    }
  },
  {
    collection: 'week'
  }
);

export const Week = model('Week', weekSchema);
