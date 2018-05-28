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