"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Plant_1 = require("../models/Plant");
const User = require('../models/User');
const MongoObjectId = require('mongodb').ObjectID;
exports.getPlant = (userId, plantNumber) => {
    return new Promise((resolve, reject) => {
        let queryObj = {
            userId: MongoObjectId(userId),
            plantNumber: plantNumber
        };
        Plant_1.Plant.find(queryObj)
            .limit(1)
            .exec((err, results) => {
            if (err) {
                reject(err);
            }
            if (!!results && !!results.length) {
                resolve(results[0]);
            }
            else {
                resolve([]);
            }
        });
    });
};
exports.addPlant = (plant) => {
    const newJob = new Plant_1.Plant(plant);
    return new Promise((resolve, reject) => {
        newJob.save((err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};
exports.addExpense = (expense) => {
    // todo append to expenses array
    return new Promise((resolve, reject) => {
        Plant_1.Plant.update({
            userId: MongoObjectId(expense.userId)
        }, {
            $push: {
                expenses: expense
            }
        }).exec((err, res) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        });
    });
};
exports.getExpenses = (userId, plantNumber) => {
    return new Promise((resolve, reject) => {
        Plant_1.Plant.find({
            userId: MongoObjectId(userId)
        }, 'expenses').exec((err, results) => {
            if (err) {
                reject(err);
            }
            else {
                const expenses = results.map((results) => results.expenses.filter((expense) => expense.plantNumber == plantNumber));
                resolve(expenses[0]);
            }
        });
    });
};
exports.getPlants = (userId, skip, take, query = null) => {
    return new Promise((resolve, reject) => {
        let queryObj = {
            userId: MongoObjectId(userId)
        };
        if (query) {
            queryObj.plantName = {
                $regex: query,
                $options: 'i'
            };
        }
        Plant_1.Plant.find(queryObj)
            .limit(take + 1)
            .skip(skip)
            .exec((err, results) => {
            if (err) {
                reject(err);
            }
            if (!!results && !!results.length) {
                const resObj = {
                    skip: skip,
                    take: take,
                    more: results.length === take + 1,
                    data: results.length > take ? results.slice(0, -1) : results
                };
                resolve(resObj);
            }
            else {
                resolve([]);
            }
        });
    });
};
exports.getAllPlants = (userId) => {
    return new Promise((resolve, reject) => {
        let queryObj = {
            userId: MongoObjectId(userId)
        };
        Plant_1.Plant.find(queryObj).exec((err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};
exports.updateJob = (updatedJob) => {
    return new Promise((resolve, reject) => {
        Plant_1.Plant.findOneAndUpdate({
            _id: MongoObjectId(updatedJob._id),
            userId: MongoObjectId(updatedJob.userId)
        }, updatedJob).exec((err) => {
            if (err) {
                reject(err);
            }
            resolve('successfully updated tool');
        });
    });
};
exports.removeJob = (job) => {
    return new Promise((resolve, reject) => {
        Plant_1.Plant.find({
            _id: MongoObjectId(job._id),
            userId: job.userId
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
exports.findJobsByJobNumber = (userId, jobNumber) => {
    return new Promise((resolve, reject) => {
        Plant_1.Plant.find({
            userId: userId,
            jobNumber: jobNumber
        }).exec((err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};
//# sourceMappingURL=plant.js.map