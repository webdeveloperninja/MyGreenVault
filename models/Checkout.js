const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    userId: {type: String, required: true },
    operatorNumber: {type: Number, require: true},
    jobNumber: {type: Number, require: true},
    toolName: {type: Number, require: true},
    checkoutQty: {type: Number, require: true} 
}, { collection: 'checkout'});

const Operator = mongoose.model('Checkout', operatorSchema);

module.exports = Operator;