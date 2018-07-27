import { Request, Response } from 'express';

import * as saleRepository from '../repositories/sale';

export const addSale = (req: Request, res: Response) => {
  let sale = {} as any;
  let salePromise;

  if (req.body._id) {
    sale = req.body;
  } else {
    sale = req.body;
    sale.userId = req.user._id;
  }

  if (sale.isQuantity) {
    salePromise = saleRepository.addQuantitySale(sale);
  } else {
    salePromise = saleRepository.addWeightedSale(sale);
  }

  salePromise
    .then((data: any) => {
      res.status(200).send(data);
    })
    .catch((err: any) => res.status(err.code).send(err));
};

export const getAll = (req: Request, res: Response) => {
  const plantId = req.params.plantId;
  const userId = req.user._id;

  saleRepository
    .getAll(userId, plantId)
    .then((sales: any) => {
      res.json(sales);
    })
    .catch((err: any) => {
      res.send(500);
    });
};

export const remove = (req: Request, res: Response) => {
  let sale;

  if (req.body._id) {
    sale = req.body;
  } else {
    sale = req.body;
    sale.userId = req.user._id;
  }

  saleRepository
    .remove(sale)
    .then((data: any) => {
      res.status(200).send(data);
    })
    .catch((err: any) => {
      res.send(500);
    });
};
