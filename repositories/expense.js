const Expense = require('../models/Expense');
const ObjectId = require('mongodb').ObjectID;

exports.add = expense => {
  const newExpense = new Expense(expense);

  return new Promise((resolve, reject) => {
    newExpense.save((err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}

exports.get = (userId, plantNumber) => {

  return new Promise((resolve, reject) => {
    Expense.find({
      userId: ObjectId(userId),
      plantNumber: plantNumber
    }).exec((err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

exports.remove = (expense) => {
  return new Promise((resolve, reject) => {
    Expense.find({
      _id: ObjectId(expense._id),
      userId: expense.userId
    }).remove().exec((err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}