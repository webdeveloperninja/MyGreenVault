import { model, Schema } from 'mongoose';

const expenseSchema = new Schema({
  name: { type: String, require: true },
  cost: { type: String, require: true },
  userId: { type: String, require: true },
  plantNumber: { type: String, require: true }
});

const Expense = model('Expense', expenseSchema);

module.exports = Expense;
