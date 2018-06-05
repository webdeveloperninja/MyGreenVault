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
  plantNumber: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  phone: {
    type: Number,
    required: false
  },
  email: {
    type: String,
    required: false
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