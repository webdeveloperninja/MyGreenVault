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
    },
    height: {
      type: Number,
      required: true
    },
    lightSchedule: {
      type: Number,
      required: true
    },
    dayAirTemperature: {
      type: Number,
      required: true
    },
    nightAirTemperature: {
      type: Number,
      required: true
    },
    ph: {
      type: Number,
      required: true
    },
    airHumidity: {
      type: Number,
      required: true
    },
    smell: {
      type: String,
      required: true
    },
    soilTemperature: {
      type: Number,
      required: true
    },
    lampToPlantDistance: {
      type: Number,
      required: true
    }
  },
  {
    collection: 'week'
  }
);

export const Week = model('Week', weekSchema);
