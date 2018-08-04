import * as moment from 'moment';

export const tryMomentConvert = (toConvert: Date): moment.Moment | Date => {
  const convertedDate = moment(toConvert);

  return moment.isMoment(convertedDate) ? convertedDate : toConvert;
};
