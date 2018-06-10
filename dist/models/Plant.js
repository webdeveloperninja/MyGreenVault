"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const plantSchema = new mongoose_1.Schema({
    plantName: {
        type: String,
        required: true
    },
    plantNumber: {
        type: String,
        required: true
    },
    plantDescription: {
        type: String,
        required: true
    },
    plantStatus: {
        type: Number,
        required: true
    },
    roomType: {
        type: Number,
        required: true
    },
    medium: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    expenses: {
        type: Array,
        required: false
    }
}, {
    collection: 'plant'
});
exports.Plant = mongoose_1.model('Plant', plantSchema);
//# sourceMappingURL=Plant.js.map