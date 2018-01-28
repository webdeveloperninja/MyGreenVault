const mongoose = require('mongoose');

const receiverSchema = new mongoose.Schema({
    stateLicenseNumber: {type: String, require: true },
    typeOfLicense: { type: String, required: true },
    businessName: { type: String, require: true },
    businessAddress: { type: String, required: true },
    businessCity: { type: String, required: true },
    businessState: { type: String, required: true },
    businessZip: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    contactName: { type: String, required: true },
    contactEmail: { type: String, required: false },
    userId: {type: String, required: true } 
}, { collection: 'receiver'});

const Receiver = mongoose.model('Receiver', receiverSchema);

module.exports = Receiver;