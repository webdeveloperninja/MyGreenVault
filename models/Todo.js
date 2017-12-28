const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {type: String, require: true },
    plantNumber: {type: String, require: true},
    userId: {type: String, required: true } 
}, { collection: 'todo'});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;