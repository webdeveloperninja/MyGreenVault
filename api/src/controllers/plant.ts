import { Request, Response } from 'express';
import url from 'url';

import * as plantQuery from '../repositories/plant';
import * as plantProfileImageService from '../services/plant-profile-image';
import { uploadRequest } from '../services/plant-profile-image';

export const getPaged = (req: Request, res: Response) => {
  const userId = req.user._id;
  let url_parts = url.parse(req.url, true);
  let skip = Number(url_parts.query.skip);
  let take = Number(url_parts.query.take);
  let query = url_parts.query.query;

  plantQuery
    .getPlants(userId, skip, take, query)
    .then((jobs: any) => {
      res.send(jobs);
    })
    .catch((error: any) => {
      res.status(500).json(error);
    });
};

export const getAll = (req: Request, res: Response) => {
  const userId = req.user._id;

  plantQuery
    .getAllPlants(userId)
    .then((plants: any) => {
      res.send(plants);
    })
    .catch((error: any) => {
      res.send(500);
    });
};

export const get = (req: Request, res: Response) => {
  const plantId = req.params.plantId;
  const userId = req.user._id;

  plantQuery
    .getPlant(userId, plantId)
    .then((job: any) => {
      res.json(job);
    })
    .catch((err: any) => {
      res.send(500);
    });
};

export const add = (req: Request, res: Response) => {
  let plant = {} as any;

  if (req.body._id) {
    plant = req.body;
  } else {
    plant = req.body;
    plant.userId = req.user._id;
  }

  addPlant(req.user._id, plant)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(err.code).send(err);
    });
};

export const update = (req: Request, res: Response) => {
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

export const remove = (req: Request, res: Response) => {
  const job = req.body;

  plantQuery
    .removeJob(job)
    .then((data: any) => {
      res.status(200).send({
        success: true
      });
    })
    .catch((err: any) => {
      res.send(500);
    });
};

export const uploadPlantProfilePhoto = (req, res, next) => {
  const uploadRequest: uploadRequest = {
    file: req.body.images.value,
    userId: req.user._id.toString(),
    plantId: req.body.plantId
  };

  plantProfileImageService
    .upload(uploadRequest)
    .then(t => {
      res.status(200).end();
    })
    .catch(err => {
      res.send(err).status(500);
    });
};

export const deletePlantProfilePhoto = (req, res, next) => {
  const plantId = req.body.plantId;
  const userId = req.user._id.toString();

  plantProfileImageService.deleteImage(plantId, userId).then(t => {
    res.status(200).end();
  });
};

function doUpdatePlant(userId: any, job: any) {
  return new Promise((resolve, reject) => {
    Promise.all([
      // Only returning 1 job not all
      plantQuery.findJobsByJobNumber(userId, job.jobNumber)
    ]).then((data: any) => {
      if (data) {
        plantQuery
          .updateJob(job)
          .then((data: any[]) => {
            resolve(true);
          })
          .catch((err: any) => {
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

function getPlant(userId: any, plantNumber: any) {
  return new Promise((resolve, reject) => {
    plantQuery
      .getPlant(userId, plantNumber)
      .then((job: any) => {
        resolve(job);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

function addPlant(userId: any, plant: any) {
  return new Promise((resolve, reject) => {
    Promise.all([getPlant(userId, plant._id)]).then((data: any) => {
      if (!data[0].plantNumber) {
        plantQuery
          .addPlant(plant)
          .then((jobResponse: any) => {
            resolve(jobResponse._doc);
          })
          .catch((err: any) => {
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
