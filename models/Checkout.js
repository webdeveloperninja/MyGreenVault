const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    userId: {type: String, required: true },
    operatorNumber: {type: Number, require: true},
    jobNumber: {type: Number, require: true},
    toolName: {type: Number, require: true},
    toolQty: {type: Number, require: true},
    cost: {type: String, require: false},
    tool: {type: Object, require: true }
}, { collection: 'checkout'});

const Operator = mongoose.model('Checkout', checkoutSchema);

module.exports = Operator;