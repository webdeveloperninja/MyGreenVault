import { Plant } from '../models/Plant';
import { resolve } from 'dns';

const User = require('../models/User');
const MongoObjectId = require('mongodb').ObjectID;

export const getPlant = (userId: any, plantId: any) => {
  return new Promise((resolve, reject) => {
    let queryObj = {
      userId: MongoObjectId(userId),
      _id: MongoObjectId(plantId)
    };

    Plant.find(queryObj)
      .limit(1)
      .exec((err: any, results: any) => {
        if (err) {
          reject(err);
        }

        if (!!results && !!results.length) {
          resolve(results[0]);
        } else {
          resolve([]);
        }
      });
  });
};

export const addPlant = (plant: any) => {
  const newJob = new Plant(plant);

  return new Promise((resolve, reject) => {
    newJob.save((err: any, results: any) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

export const addExpense = (expense: any) => {
  // todo append to expenses array
  return new Promise((resolve, reject) => {
    Plant.update(
      {
        userId: MongoObjectId(expense.userId)
      },
      {
        $push: {
          expenses: expense
        }
      }
    ).exec((err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

export const getExpenses = (userId: any, plantNumber: any) => {
  return new Promise((resolve, reject) => {
    Plant.find(
      {
        userId: MongoObjectId(userId)
      },
      'expenses'
    ).exec((err: any, results: any) => {
      if (err) {
        reject(err);
      } else {
        const expenses = results.map((results: any) => results.expenses.filter((expense: any) => expense.plantNumber == plantNumber));
        resolve(expenses[0]);
      }
    });
  });
};

export const getPlants = (userId: any, skip: any, take: any, query: any = null) => {
  return new Promise((resolve, reject) => {
    let queryObj = {
      userId: MongoObjectId(userId)
    } as any;

    if (query) {
      queryObj.plantName = {
        $regex: query,
        $options: 'i'
      };
    }

    Plant.find(queryObj)
      .limit(take + 1)
      .skip(skip)
      .exec((err: any, results: any) => {
        if (err) {
          reject(err);
        }

        if (!!results && !!results.length) {
          const resObj = {
            skip: skip,
            take: take,
            more: results.length === take + 1,
            data: results.length > take ? results.slice(0, -1) : results
          };
          resolve(resObj);
        } else {
          resolve([]);
        }
      });
  });
};

export const getAllPlants = (userId: any) => {
  return new Promise((resolve, reject) => {
    let queryObj = {
      userId: MongoObjectId(userId)
    };

    Plant.find(queryObj).exec((err: any, results: any) => {
      if (err) {
        reject(err);
      }

      resolve(results);
    });
  });
};

export const addProfilImage = (plantId: string, plantProfileImage) => {
  return new Promise((resolve, reject) => {
    Plant.update({ _id: MongoObjectId(plantId) }, { $push: { profilePictures: plantProfileImage } }, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

export const updateJob = (updatedJob: any) => {
  return new Promise((resolve, reject) => {
    Plant.findOneAndUpdate(
      {
        _id: MongoObjectId(updatedJob._id),
        userId: MongoObjectId(updatedJob.userId)
      },
      updatedJob
    ).exec((err: any) => {
      if (err) {
        reject(err);
      }
      resolve('successfully updated tool');
    });
  });
};

export const removeJob = (job: any) => {
  return new Promise((resolve, reject) => {
    Plant.find({
      _id: MongoObjectId(job._id),
      userId: job.userId
    })
      .remove()
      .exec((err: any, result: any) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
  });
};

export const findJobsByJobNumber = (userId: any, jobNumber: any) => {
  return new Promise((resolve, reject) => {
    Plant.find({
      userId: userId,
      jobNumber: jobNumber
    }).exec((err: any, results: any) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};
