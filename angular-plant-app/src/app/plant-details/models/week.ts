import * as moment from 'moment';

export interface Week {
  _id: string;
  airHumidity: number;
  dayAirTemperature: number;
  end: moment.Moment;
  height: number;
  lampToPlantDistance: number;
  lightSchedule: number;
  nightAirTemperature: number;
  ph: number;
  smell: string;
  soilTemperature: number;
  start: moment.Moment;
}
