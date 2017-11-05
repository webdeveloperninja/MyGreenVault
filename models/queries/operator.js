const User = require('../../models/User');
const Operator = require('../../models/Operator');
const ObjectId = require('mongodb').ObjectID;


let getOperator = exports.getOperator = (userId, operatorNumber) => {
    return new Promise((resolve, reject) => {
        Operator.find({
            operatorNumber: Number(operatorNumber),
            userId: ObjectId(userId)
        }).exec((err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
}

let getOperators = exports.getOperators = (userId, skip, take, query = null) => {
    return new Promise((resolve, reject) => {
        let queryObj = {
            userId: ObjectId(userId)
        }

        if (query) {
            queryObj.operatorName = {'$regex': query, '$options' : 'i'};
        }

        Operator.find(queryObj)
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
                    more: (results.length === take + 1),
                    data: (results.length > take) ? results.slice(0, -1) : results
                }
                resolve(resObj);
            } else {
                resolve([]);
            }
            
        });
    });
}

let addOperator = exports.addOperator = operator => {
    const newOperator = new Operator(operator);

    return new Promise((resolve, reject) => {
        newOperator.save((err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

let removeOperator = exports.removeOperator = (operator) => {
    return new Promise((resolve, reject) => {
        Operator.find({
            _id: ObjectId(operator._id),
            userId: operator.userId
        }).remove().exec((err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

let updateOperator = exports.updateOperator = (updatedOperator) => {
    return new Promise((resolve, reject) => {
        Operator.findOneAndUpdate({
            _id: ObjectId(updatedOperator._id),
            userId: ObjectId(updatedOperator.userId)
        }, updatedOperator).exec(err => {
            if (err) {
                reject(err);
            }
            resolve('successfully updated tool');
        });
    });
}

let doesOperatorExist = exports.doesOperatorExist = (userId, operatorNumber) => {
    return new Promise((resolve, reject) => {
        getOperator(userId, operatorNumber).then(operator => {
            if (operator && operator.operatorNumber) {
                resolve(true);
            } else {
                resolve(false);
            }
        }).catch(err => {
            reject(err);
        })
    })
}