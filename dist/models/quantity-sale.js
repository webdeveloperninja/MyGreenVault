"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const quantitySale = new mongoose_1.Schema({
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
exports.QuantitySale = mongoose_1.model('QuantitySale', quantitySale);
//# sourceMappingURL=quantity-sale.js.map