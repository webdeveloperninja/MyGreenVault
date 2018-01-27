const mongoose = require('mongoose');

const shipperSchema = new mongoose.Schema({
    stateLicenseNumber: {type: String, require: true},
    typeOfLicense: {type: String, require: true},
    businessName: {type: String, require: true},
    businessAddress: {type: String, require: true},
    businessCity: {type: String, require: true},
    businessState: {type: String, require: true},
    businessZip: {type: String, require: true},
    businessPhoneNumber: {type: String, require: true},
    businessContactName: {type: String, require: true},
    userId: {type: String, required: true } 
}, { collection: 'shipper'});

const Shipper = mongoose.model('Shipper', shipperSchema);

module.exports = Shipper;