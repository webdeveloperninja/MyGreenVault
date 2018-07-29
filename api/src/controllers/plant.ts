import { Request, Response } from 'express';
import url from 'url';
import * as plantQuery from '../repositories/plant';
import * as timelineQuery from '../repositories/timeline';
import * as weekQuery from '../repositories/week';
import * as plantProvider from '../providers/plant';
import * as plantProfileImageService from '../services/plant-profile-image';
import { uploadRequest } from '../services/plant-profile-image';
import { PlantDetails } from '../contracts/plant-details';
const moment = require('moment');

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

export const get = async (req: Request, res: Response) => {
  const plantId = req.params.plantId;
  const userId = req.user._id;

  try {
    const plant = await plantQuery.getPlant(userId, plantId);
    res
      .send(plant)
      .status(200)
      .end();
  } catch (err) {
    res
      .send(err)
      .status(500)
      .end();
  }
};

export const add = async (req: Request, res: Response) => {
  let plantRequest = {} as any;

  if (req.body._id) {
    plantRequest = req.body;
  } else {
    plantRequest = req.body;
    plantRequest.userId = req.user._id;
  }

  try {
    const added = await plantProvider.add(plantRequest);
    res
      .send(added)
      .status(200)
      .end();
  } catch (err) {
    res.send(err).status(500);
  }
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

export const remove = async (req: Request, res: Response) => {
  const plantToDelete = req.body;

  try {
    const plant = (await plantQuery.getPlant(req.user._id, req.body._id)) as any;

    if (!!plant && !!plant.profileImages.length && plant.profileImages.length > 0) {
      await deleteImages(plant.profileImages);
    }

    const removedPlant = await plantQuery.remove(plantToDelete);
    res
      .send(removedPlant)
      .status(200)
      .end();
  } catch (err) {
    res.send(err).status(500);
  }
};

async function deleteImages(images) {
  for (let index = 0; index < images.length; index++) {
    await plantProfileImageService.deleteBlob(images[index]);
  }
}

export const uploadPlantProfilePhoto = async (req, res, next) => {
  const uploadRequest: uploadRequest = {
    file: req.body.images.value,
    userId: req.user._id.toString(),
    plantId: req.body.plantId
  };

  try {
    const blobName = (await plantProfileImageService.upload(uploadRequest)) as string;
    const blobUrl = plantProfileImageService.getBlobUrl(blobName);

    await plantQuery.addProfilImage(req.body.plantId, blobUrl);
    res.send({ imageUrl: blobUrl }).sendStatus(200);
  } catch (err) {
    res
      .send(err)
      .status(500)
      .end();
  }
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

async function addPlant(userId: any, plantRequest: any) {
  const plant = await getPlant(userId, plantRequest._id);

  if (!!plant) {
  }

  return new Promise((resolve, reject) => {
    Promise.all([getPlant(userId, plantRequest._id)]).then((data: any) => {
      if (!data[0].plantNumber) {
        plantQuery
          .addPlant(plantRequest)
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
