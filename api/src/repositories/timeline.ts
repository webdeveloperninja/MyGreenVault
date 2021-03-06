import { Timeline } from '../models/Timeline';

export const add = (weeks: string[]) => {
  const newTimeline = new Timeline({ weeks });

  return new Promise((resolve, reject) => {
    newTimeline.save((err: any, results: any) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};
