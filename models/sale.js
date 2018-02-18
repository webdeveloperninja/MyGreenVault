const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema(
  {
    businessAddress: { type: String, required: true },
    businessCity: { type: String, required: true },
    businessName: { type: String, required: true },
    businessState: { type: String, required: true },
    businessZip: { type: Number, required: true },
    contactEmail: { type: String, required: true },
    contactName: { type: String, required: true },
    itemName: { type: String, required: true },
    itemDescription: { type: String, required: true },
    itemWeightOrCount: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    qtyOrdered: { type: Number, required: true },
    stateLicenseNumber: { type: String, required: true },
    totalCost: { type: Number, required: true },
    typeOfLicense: { type: String, required: true },
    uidTagNumber: { type: String, required: true },
    unitCost: { type: Number, required: true },
    userId: { type: String, required: true }
  },
  { collection: 'sale' }
);

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
