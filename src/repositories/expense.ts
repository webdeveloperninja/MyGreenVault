const Expense = require('../models/Expense');
const ObjId = require('mongodb').ObjectID;

export const add = (expense: any) => {
  const newExpense = new Expense(expense);

  return new Promise((resolve, reject) => {
    newExpense.save((err: any, results: any) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

export const get = (userId: any, plantNumber: any) => {
  return new Promise((resolve, reject) => {
    Expense.find({
      userId: ObjId(userId),
      plantNumber: plantNumber
    }).exec((err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const remove = (expense: any) => {
  return new Promise((resolve, reject) => {
    Expense.find({
      _id: ObjId(expense._id),
      userId: expense.userId
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
