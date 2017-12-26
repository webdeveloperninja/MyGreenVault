const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    plantName: { type: String, required: true },
    plantNumber: { type: String, required: true },
    plantDescription: { type: String, required: true },
    plantStatus: { type: Number, required: true },
    userId: {type: String, required: true } 
}, { collection: 'plant'});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;