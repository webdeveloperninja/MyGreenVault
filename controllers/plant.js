'use strict';

const url = require('url');
const plantQuery = require('../repositories/plant');
const expenseQuery = require('../repositories/expense');
const todoQuery = require('../repositories/todo');
const noteQuery = require('../repositories/note');

exports.getPlants = (req, res) => {
  const userId = req.user._id;
  let url_parts = url.parse(req.url, true);
  let skip = Number(url_parts.query.skip);
  let take = Number(url_parts.query.take);
  let query = url_parts.query.query;

  plantQuery
    .getPlants(userId, skip, take, query)
    .then(jobs => {
      res.send(jobs);
    })
    .catch(error => {
      res.send(500);
      throw new Error(error);
    });
};

exports.getAllPlants = (req, res) => {
  const userId = req.user._id;

  plantQuery
    .getAllPlants(userId)
    .then(plants => {
      res.send(plants);
    })
    .catch(error => {
      res.send(500);
      throw new Error(error);
    });
};

exports.getPlant = (req, res) => {
  const plantNumber = req.params.plantNumber;
  const userId = req.user._id;

  plantQuery
    .getPlant(userId, plantNumber)
    .then(job => {
      res.json(job);
    })
    .catch(err => {
      res.send(500);
      throw new Error(err);
    });
};

exports.addPlant = (req, res) => {
  let job = {};

  if (req.body._id) {
    job = req.body;
  } else {
    job = req.body;
    job.userId = req.user._id;
  }

  doAddJob(req.user._id, job, res)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(err.code).send(err);
    });
};

exports.updatePlant = (req, res) => {
  const job = req.body;

  if (!job.userId) {
    job.userId = req.user._id;
  }

  doUpdateJob(req.user._id, job)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(err.code).send(err);
    });
};

exports.removePlant = (req, res) => {
  const job = req.body;

  plantQuery
    .removeJob(job)
    .then(data => {
      res.status(200).send({ success: true });
    })
    .catch(err => {
      res.send(500);
      throw new Error(err);
    });
};

exports.addPlantNote = (req, res) => {
  const plantNumber = req.params.plantNumber;
  if (!plantNumber) {
    res.send(403);
  }
  let note = req.body;

  note.userId = req.user._id;

  note.plantNumber = plantNumber;

  noteQuery
    .add(note)
    .then(data => {
      res.send(200);
    })
    .catch(err => {
      res.send(500);
      throw new Error(err);
    });
};

exports.getPlantNotes = (req, res) => {
  const plantNumber = req.params.plantNumber;
  const userId = req.user._id;

  noteQuery
    .get(userId, plantNumber)
    .then(todos => {
      res.send(todos);
    })
    .catch(error => {
      res.send(500);
      throw new Error(error);
    });
};

exports.removePlantNote = (req, res) => {
  const note = req.body;

  noteQuery
    .remove(note)
    .then(data => {
      res.send(200);
    })
    .catch(err => {
      res.send(500);
      throw new Error(err);
    });
};

exports.getPlantTodos = (req, res) => {
  const plantNumber = req.params.plantNumber;
  const userId = req.user._id;

  todoQuery
    .get(userId, plantNumber)
    .then(todos => {
      res.send(todos);
    })
    .catch(error => {
      res.send(500);
      throw new Error(error);
    });
};

exports.addPlantTodo = (req, res) => {
  const plantNumber = req.params.plantNumber;
  if (!plantNumber) {
    res.send(403);
  }
  let expense = req.body;

  expense.userId = req.user._id;

  expense.plantNumber = plantNumber;

  todoQuery
    .add(expense)
    .then(data => {
      res.send(200);
    })
    .catch(err => {
      res.send(500);
      throw new Error(err);
    });
};

exports.removePlantTodo = (req, res) => {
  const todo = req.body;

  todoQuery
    .remove(todo)
    .then(data => {
      res.send(200);
    })
    .catch(err => {
      res.send(500);
      throw new Error(err);
    });
};

exports.getPlantExpenses = (req, res) => {
  const plantNumber = req.params.plantNumber;
  const userId = req.user._id;

  expenseQuery
    .get(userId, plantNumber)
    .then(expenses => {
      res.send(expenses);
    })
    .catch(error => {
      res.send(500);
      throw new Error(error);
    });
};

exports.addPlantExpenses = (req, res) => {
  const plantNumber = req.params.plantNumber;
  if (!plantNumber) {
    res.send(403);
  }
  let expense = req.body;

  expense.userId = req.user._id;

  expense.plantNumber = plantNumber;

  expenseQuery
    .add(expense)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.send(500);
      throw new Error(err);
    });
};

exports.removePlantExpenses = (req, res) => {
  const expense = req.body;

  expenseQuery
    .remove(expense)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.send(500);
      throw new Error(err);
    });
};

function doUpdateJob(userId, job) {
  return new Promise((resolve, reject) => {
    Promise.all([
      // Only returning 1 job not all
      plantQuery.findJobsByJobNumber(userId, job.jobNumber)
    ]).then(data => {
      if (data) {
        plantQuery
          .updateJob(job)
          .then(data => {
            resolve(true);
          })
          .catch(err => {
            reject({
              code: 417,
              message: `Job with job number ${data[0].jobNumber} exists please use another one`,
              status: 'danger'
            });
          });
      } else {
        reject({
          code: 417,
          message: `Job with job number ${data[0].jobNumber} exists please use another one`,
          status: 'danger'
        });
      }
    });
  });
}

function getJob(userId, jobNumber) {
  return new Promise((resolve, reject) => {
    plantQuery
      .getPlant(userId, jobNumber)
      .then(job => {
        resolve(job);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function doAddJob(userId, job) {
  return new Promise((resolve, reject) => {
    Promise.all([getJob(userId, job.plantNumber)]).then(data => {
      if (!data[0].jobNumber) {
        plantQuery
          .addJob(job)
          .then(jobResponse => {
            resolve(jobResponse._doc);
          })
          .catch(err => {
            reject({
              code: 500,
              message: err
            });
          });
      } else {
        reject({
          code: 417,
          message: `Job with job number ${data[0].jobNumber} exists please use another one`,
          status: 'danger'
        });
      }
    });
  });
}
