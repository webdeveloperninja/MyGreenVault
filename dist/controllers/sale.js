"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const saleRepository = __importStar(require("../repositories/sale"));
exports.addSale = (req, res) => {
    let sale = {};
    let salePromise;
    if (req.body._id) {
        sale = req.body;
    }
    else {
        sale = req.body;
        sale.userId = req.user._id;
    }
    if (sale.isQuantity) {
        salePromise = saleRepository.addQuantitySale(sale);
    }
    else {
        salePromise = saleRepository.addWeightedSale(sale);
    }
    salePromise
        .then((data) => {
        res.status(200).send(data);
    })
        .catch((err) => res.status(err.code).send(err));
};
exports.getAll = (req, res) => {
    const plantNumber = req.params.plantNumber;
    const userId = req.user._id;
    saleRepository
        .getAll(userId, plantNumber)
        .then((sales) => {
        res.json(sales);
    })
        .catch((err) => {
        res.send(500);
    });
};
exports.remove = (req, res) => {
    let sale;
    if (req.body._id) {
        sale = req.body;
    }
    else {
        sale = req.body;
        sale.userId = req.user._id;
    }
    saleRepository
        .remove(sale)
        .then((data) => {
        res.status(200).send(data);
    })
        .catch((err) => {
        res.send(500);
    });
};
//# sourceMappingURL=sale.js.map