import { Week } from '../models/week';
import { resolve } from 'url';
import { weekdaysShort } from 'moment';
const MongoObjectId = require('mongodb').ObjectID;

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

export const getWeeks = (weekIds: string[]) => {
  return new Promise((resolve, reject) => {
    Week.find()
      .where('_id')
      .in(weekIds)
      .exec((err, weeks) => {
        if (err) {
          reject(err);
        }
        resolve(weeks);
      });
  });
};

export const updateWeek = (weekId: string, updated: any) => {
  return new Promise((resolve, reject) => {
    Week.findOneAndUpdate(
      {
        _id: MongoObjectId(weekId)
      },
      updated
    ).exec((err: any) => {
      if (err) {
        reject(err);
      }
      resolve('successfully updated tool');
    });
  });
};
