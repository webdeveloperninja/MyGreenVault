const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    name: {type: String, require: true },
    plantNumber: {type: String, require: true},
    userId: {type: String, required: true } 
}, { collection: 'note'});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;