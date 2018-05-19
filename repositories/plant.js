const User = require('../models/User');
const Plant = require('../models/Plant');
const ObjectId = require('mongodb').ObjectID;

exports.getPlant = (userId, plantNumber) => {
  return new Promise((resolve, reject) => {
    let queryObj = {
      userId: ObjectId(userId),
      plantNumber: plantNumber
    };

    Plant.find(queryObj)
      .limit(1)
      .exec((err, results) => {
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

exports.addJob = job => {
  const newJob = new Plant(job);

  return new Promise((resolve, reject) => {
    newJob.save((err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

exports.addExpense = expense => {
  // todo append to expenses array
  return new Promise((resolve, reject) => {
    Plant.update({ userId: ObjectId(expense.userId) }, { $push: { expenses: expense } }).exec((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.getExpenses = (userId, plantNumber) => {
  return new Promise((resolve, reject) => {
    Plant.find({ userId: ObjectId(userId) }, 'expenses').exec((err, results) => {
      if (err) {
        reject(err);
      } else {
        const expenses = results.map(results => results.expenses.filter(expense => expense.plantNumber == plantNumber));
        resolve(expenses[0]);
      }
    });
  });
};

exports.getPlants = (userId, skip, take, query = null) => {
  return new Promise((resolve, reject) => {
    let queryObj = {
      userId: ObjectId(userId)
    };

    if (query) {
      queryObj.plantName = { $regex: query, $options: 'i' };
    }

    Plant.find(queryObj)
      .limit(take + 1)
      .skip(skip)
      .exec((err, results) => {
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

exports.getAllPlants = userId => {
  return new Promise((resolve, reject) => {
    let queryObj = {
      userId: ObjectId(userId)
    };

    Plant.find(queryObj).exec((err, results) => {
      if (err) {
        reject(err);
      }

      resolve(results);
    });
  });
};

exports.updateJob = updatedJob => {
  return new Promise((resolve, reject) => {
    Plant.findOneAndUpdate(
      {
        _id: ObjectId(updatedJob._id),
        userId: ObjectId(updatedJob.userId)
      },
      updatedJob
    ).exec(err => {
      if (err) {
        reject(err);
      }
      resolve('successfully updated tool');
    });
  });
};

exports.removeJob = job => {
  return new Promise((resolve, reject) => {
    Plant.find({
      _id: ObjectId(job._id),
      userId: job.userId
    })
      .remove()
      .exec((err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
  });
};

exports.doesJobExist = (userId, jobNumber) => {
  return new Promise((resolve, reject) => {
    getJob(userId, jobNumber)
      .then(job => {
        if (job.jobNumber) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.findJobsByJobNumber = (userId, jobNumber) => {
  return new Promise((resolve, reject) => {
    Plant.find({
      userId: userId,
      jobNumber: jobNumber
    }).exec((err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};
