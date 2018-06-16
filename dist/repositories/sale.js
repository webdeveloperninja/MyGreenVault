"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quantity_sale_1 = require("../models/quantity-sale");
const weighted_sale_1 = require("../models/weighted-sale");
const ObjectId = require('mongodb').ObjectID;
exports.addWeightedSale = (sale) => {
    const weightedSale = new weighted_sale_1.WeightedSale(sale);
    return new Promise((resolve, reject) => {
        weightedSale.save((err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};
exports.addQuantitySale = (sale) => {
    const quantitySale = new quantity_sale_1.QuantitySale(sale);
    return new Promise((resolve, reject) => {
        quantitySale.save((err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};
exports.getAll = (userId, plantNumber) => {
    /**
     * QuantiySale and WeightedSale are in the same collection
     * calling QuantitySale.find returns all documents in sale
     * collection
     */
    return new Promise((resolve, reject) => {
        quantity_sale_1.QuantitySale.find({
            userId: userId,
            plantNumber: plantNumber
        }).exec((err, results) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(results);
            }
        });
    });
};
exports.remove = (sale) => {
    return new Promise((resolve, reject) => {
        quantity_sale_1.QuantitySale.find({
            _id: ObjectId(sale._id),
            userId: sale.userId
        })
            .remove()
            .exec((err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};
//# sourceMappingURL=sale.js.map