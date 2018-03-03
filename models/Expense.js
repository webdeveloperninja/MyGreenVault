const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  name: { type: String, require: true },
  cost: { type: String, require: true },
  userId: { type: String, require: true },
  plantNumber: { type: String, require: true }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;