const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    contactName: { type: String, required: true },
    contactPhoneNumber: { type: String, required: true },
    contactEmail: { type: String, required: true },
    jobName: { type: String, required: true },
    jobNumber: { type: String, required: true },
    jobDescription: { type: String, required: true },
    jobStatus: { type: Number, required: true },
    toolCheckouts: { type: Array, required: false },
    userId: {type: String, required: true } 
}, { collection: 'job'});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;