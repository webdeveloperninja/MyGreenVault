const Todo = require('../models/Todo');
const ObjectId = require('mongodb').ObjectID;

module.exports.add = todo => {
  const newTodo = new Todo(todo);

  return new Promise((resolve, reject) => {
    newTodo.save((err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}

module.exports.get = (userId, plantNumber) => {
  return new Promise((resolve, reject) => {
    Todo.find({
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

module.exports.remove = (todo) => {
  return new Promise((resolve, reject) => {
    Todo.find({
      _id: ObjectId(todo._id),
      userId: todo.userId
    }).remove().exec((err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}