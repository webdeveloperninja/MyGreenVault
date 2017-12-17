const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, require: true },
    weight: { type: Number, required: true },
    idealWeight: { type: Number, require: false },
    autoOrderWeight: { type: Number, required: false },
    supplierName: { type: String, required: false },
    supplierEmail: { type: String, required: false },
    supplierPhone: { type: Number, required: false },
    costPerGram: { type: Number, required: false },
    costPerEighth: { type: Number, required: false },
    costPerQuarter: { type: Number, required: false },
    costPerHalf: { type: Number, required: false },
    costPerOunce: { type: Number, required: false },
    costPerQuarterPound: { type: Number, required: false },
    userId: {type: String, required: true } 
}, { collection: 'product'});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;