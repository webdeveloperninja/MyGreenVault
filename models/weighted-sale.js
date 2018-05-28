const mongoose = require('mongoose');

const weightedSale = new mongoose.Schema({
  isQuantity: {
    type: Boolean,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  plantNumber: {
    type: Number,
    required: true
  },
  unit: {
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

const WeightedSale = mongoose.model('WeightedSale', weightedSale);

module.exports = WeightedSale;