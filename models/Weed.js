const mongoose = require('mongoose');

const weedSchema = new mongoose.Schema({
    name: {type: String, require: true },
    qty: { type: Number, required: true },
    cost: { type: String, require: false },
    idealAmount: { type: Number, required: true },
    autoOrderQty: { type: Number, required: true },
    userId: {type: String, required: true } 
}, { collection: 'weed'});

const Weed = mongoose.model('Weed', weedSchema);

module.exports = Weed;