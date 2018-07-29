import * as weeksRepository from '../repositories/week';
import { Request, Response } from 'express';

export const get = async (req: Request, res: Response) => {
  const weekIds = req.body;

  try {
    const weeks = await weeksRepository.getWeeks(weekIds);
    res
      .send(weeks)
      .status(200)
      .end();
  } catch (err) {
    res
      .send(err)
      .status(500)
      .end();
  }
};

export const update = async (req: Request, res: Response) => {
  const weekId = req.params.weekId;
  const updated = req.body;

  try {
    const weeks = await weeksRepository.updateWeek(weekId, updated);
    res
      .send({ weeks: weeks })
      .status(200)
      .end();
  } catch (err) {
    res
      .send(err)
      .status(500)
      .end();
  }
};
