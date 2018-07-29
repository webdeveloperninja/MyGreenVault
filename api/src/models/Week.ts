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
      required: false
    },
    lightSchedule: {
      type: Number,
      required: false
    },
    dayAirTemperature: {
      type: Number,
      required: false
    },
    nightAirTemperature: {
      type: Number,
      required: false
    },
    ph: {
      type: Number,
      required: false
    },
    airHumidity: {
      type: Number,
      required: false
    },
    smell: {
      type: String,
      required: false
    },
    soilTemperature: {
      type: Number,
      required: false
    },
    lampToPlantDistance: {
      type: Number,
      required: false
    }
  },
  {
    collection: 'week'
  }
);

export const Week = model('Week', weekSchema);
