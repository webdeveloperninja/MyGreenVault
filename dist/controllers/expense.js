"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const expenseRepository = __importStar(require("../repositories/expense"));
exports.getAll = (req, res) => {
    const plantNumber = req.params.plantNumber;
    const userId = req.user._id;
    expenseRepository
        .get(userId, plantNumber)
        .then((expenses) => {
        res.send(expenses);
    })
        .catch((error) => {
        res.send(500);
    });
};
exports.add = (req, res) => {
    const plantNumber = req.params.plantNumber;
    if (!plantNumber) {
        res.send(403);
    }
    let expense = req.body;
    expense.userId = req.user._id;
    expense.plantNumber = plantNumber;
    expenseRepository
        .add(expense)
        .then((data) => {
        res.status(200).send(data);
    })
        .catch((err) => {
        res.send(500);
    });
};
exports.remove = (req, res) => {
    const expense = req.body;
    expenseRepository
        .remove(expense)
        .then((data) => {
        res.status(200).send(data);
    })
        .catch((err) => {
        res.send(500);
    });
};
//# sourceMappingURL=expense.js.map