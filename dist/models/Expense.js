"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const expenseSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    cost: { type: String, require: true },
    userId: { type: String, require: true },
    plantNumber: { type: String, require: true }
});
const Expense = mongoose_1.model('Expense', expenseSchema);
module.exports = Expense;
//# sourceMappingURL=Expense.js.map