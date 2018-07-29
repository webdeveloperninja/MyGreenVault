import { Week } from '../models/week';
import { resolve } from 'url';
import { weekdaysShort } from 'moment';

export const add = (start: Date, end: Date) => {
  const createdOn = new Date();

  const newWeek = new Week({
    start,
    end,
    createdOn
  });

  return new Promise((resolve, reject) => {
    newWeek.save((err: any, results: any) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

export const addMany = newWeeks => {
  return new Promise((resolve, reject) => {
    Week.insertMany(newWeeks, (err, docs) => {
      if (err) {
        reject(err);
      }
      resolve(docs);
    });
  });
};
