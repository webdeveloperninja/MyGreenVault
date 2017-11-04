const mongoose = require('mongoose');

const operatorSchema = new mongoose.Schema({
    operatorName: {type: String, require: true},
    operatorNumber: {type: Number, require: true},
    userId: {type: String, required: true } 
}, { collection: 'operator'});

const Operator = mongoose.model('Operator', operatorSchema);

module.exports = Operator;