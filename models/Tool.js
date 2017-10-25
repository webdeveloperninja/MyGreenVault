const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
    toolName: {type: String, require: true },
    qty: { type: Number, required: true },
    toolCost: { type: String, require: false },
    idealAmount: { type: Number, required: true },
    autoOrderQty: { type: Number, required: true },
    userId: {type: String, required: true } 
}, { collection: 'tool'});

const Tool = mongoose.model('Tool', toolSchema);

module.exports = Tool;