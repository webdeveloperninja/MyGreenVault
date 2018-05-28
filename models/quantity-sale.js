const mongoose = require('mongoose');

const quantitySale = new mongoose.Schema({
  isQuantity: {
    type: Boolean,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
}, {
  collection: 'sales'
});

const QuantitySale = mongoose.model('QuantitySale', quantitySale);

module.exports = QuantitySale;

// TODO us typescript 
// export enum Unit {
//   grams,
//   pounds,
//   kilograms
// }