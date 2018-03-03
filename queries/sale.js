const Sale = require('../models/Sale');
const ObjectId = require('mongodb').ObjectID;

module.exports.add = sale => {
  const newSale = new Sale(sale);

  return new Promise((resolve, reject) => {
    newSale.save((err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}
