import { QuantitySale } from '../models/quantity-sale';
import { WeightedSale } from '../models/weighted-sale';

const ObjectId = require('mongodb').ObjectID;

export const addWeightedSale = (sale: any) => {
  const weightedSale = new WeightedSale(sale);

  return new Promise((resolve, reject) => {
    weightedSale.save((err: any, results: any) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

export const addQuantitySale = (sale: any) => {
  const quantitySale = new QuantitySale(sale);

  return new Promise((resolve, reject) => {
    quantitySale.save((err: any, results: any) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

export const getAll = (userId: any, plantId: any) => {
  /**
   * QuantiySale and WeightedSale are in the same collection
   * calling QuantitySale.find returns all documents in sale
   * collection
   */
  return new Promise((resolve, reject) => {
    QuantitySale.find({
      userId: userId,
      plantId: plantId
    }).exec((err: any, results: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export const remove = (sale: any) => {
  return new Promise((resolve, reject) => {
    QuantitySale.find({
      _id: ObjectId(sale._id),
      userId: sale.userId
    })
      .remove()
      .exec((err: any, result: any) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
  });
};
