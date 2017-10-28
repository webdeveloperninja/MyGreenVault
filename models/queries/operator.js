const User = require('../../models/User');
const Operator = require('../../models/Operator');
const ObjectId = require('mongodb').ObjectID;

// exports.getOperator = (userId, operatorNumber) => {
//     return new Promise((resolve, reject) => {
//         User.findOne({ '_id': userId }, (err, user) => {
//             if (err) return handleError(err);
//             for (var i=0; i< user.operators.length; i++) {
//                 const actualOperatorNumber = user.operators[i].operatorNumber;
//                 const operatorNumberToCompare = operatorNumber;
//                 if (actualOperatorNumber === operatorNumberToCompare) {
//                     resolve(user.operators[i]);
//                     return;
//                 }
//             }
//             resolve(null);
//         });
//     }) 
// }

exports.getOperator = (userId, operatorNumber) => {
    return new Promise((resolve, reject) => {
        Operator.find({
            operatorNumber: Number(operatorNumber),
            userId: ObjectId(userId)
        }).exec((err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

exports.getOperators = (userId, skip, take, query = null) => {
    return new Promise((resolve, reject) => {
        let queryObj = {
            userId: ObjectId(userId)
        }

        if (query) {
            queryObj.toolName = {'$regex': query, '$options' : 'i'};
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

exports.addOperator = operator => {
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
