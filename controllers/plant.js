'use strict';

const url = require('url');
const plantQuery = require('../repositories/plant');

exports.getPaged = (req, res) => {
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
    });
};

exports.getAll = (req, res) => {
  const userId = req.user._id;

  plantQuery
    .getAllPlants(userId)
    .then(plants => {
      res.send(plants);
    })
    .catch(error => {
      res.send(500);
    });
};

exports.get = (req, res) => {
  const plantNumber = req.params.plantNumber;
  const userId = req.user._id;

  plantQuery
    .getPlant(userId, plantNumber)
    .then(job => {
      res.json(job);
    })
    .catch(err => {
      res.send(500);
    });
};

exports.add = (req, res) => {
  let job = {};

  if (req.body._id) {
    job = req.body;
  } else {
    job = req.body;
    job.userId = req.user._id;
  }

  addPlant(req.user._id, job, res)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(err.code).send(err);
    });
};

exports.update = (req, res) => {
  const job = req.body;

  if (!job.userId) {
    job.userId = req.user._id;
  }

  doUpdatePlant(req.user._id, job)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(err.code).send(err);
    });
};

exports.remove = (req, res) => {
  const job = req.body;

  plantQuery
    .removeJob(job)
    .then(data => {
      res.status(200).send({
        success: true
      });
    })
    .catch(err => {
      res.send(500);
    });
};

function doUpdatePlant(userId, job) {
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

function getPlant(userId, plantNumber) {
  return new Promise((resolve, reject) => {
    plantQuery
      .getPlant(userId, plantNumber)
      .then(job => {
        resolve(job);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function addPlant(userId, plant) {
  return new Promise((resolve, reject) => {
    Promise.all([getPlant(userId, plant.plantNumber)]).then(data => {
      if (!data[0].plantNumber) {
        plantQuery
          .addJob(plant)
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