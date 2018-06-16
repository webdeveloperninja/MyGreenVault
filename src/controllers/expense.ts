import { Request, Response } from 'express';

import * as expenseRepository from '../repositories/expense';

export const getAll = (req: Request, res: Response) => {
  const plantNumber = req.params.plantNumber;
  const userId = req.user._id;

  expenseRepository
    .get(userId, plantNumber)
    .then((expenses: any) => {
      res.send(expenses);
    })
    .catch((error: any) => {
      res.send(500);
    });
};

export const add = (req: Request, res: Response) => {
  const plantNumber = req.params.plantNumber;
  if (!plantNumber) {
    res.send(403);
  }
  let expense = req.body;

  expense.userId = req.user._id;

  expense.plantNumber = plantNumber;

  expenseRepository
    .add(expense)
    .then((data: any) => {
      res.status(200).send(data);
    })
    .catch((err: any) => {
      res.send(500);
    });
};

export const remove = (req: Request, res: Response) => {
  const expense = req.body;

  expenseRepository
    .remove(expense)
    .then((data: any) => {
      res.status(200).send(data);
    })
    .catch((err: any) => {
      res.send(500);
    });
};
