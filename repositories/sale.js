const WeightedSale = require('../models/weighted-sale');
const QuantitySale = require('../models/quantity-sale');

exports.addWeightedSale = sale => {
  const weightedSale = new WeightedSale(sale);

  return new Promise((resolve, reject) => {
    weightedSale.save((err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

exports.addQuantitySale = sale => {
  const quantitySale = new QuantitySale(sale);

  return new Promise((resolve, reject) => {
    quantitySale.save((err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

exports.getAll = (userId, plantNumber) => {
  /**
   * QuantiySale and WeightedSale are in the same collection
   * calling QuantitySale.find returns all documents in sale 
   * collection
   */
  return new Promise((resolve, reject) => {
    QuantitySale.find({
      userId: userId,
      plantNumber: plantNumber
    }).exec((err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}