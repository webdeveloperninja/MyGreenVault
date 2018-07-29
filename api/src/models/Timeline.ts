import { model, Schema } from 'mongoose';

const timelineSchema = new Schema(
  {
    createdOn: {
      type: Date,
      required: true
    },
    weeks: {
      type: Array,
      required: true
    }
  },
  {
    collection: 'timeline'
  }
);

export const Timeline = model('Timeline', timelineSchema);
