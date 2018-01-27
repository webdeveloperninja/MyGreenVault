const Receiver = require('../models/Receiver');
const ObjectId = require('mongodb').ObjectID;

function add(receiver) {
    const newReceiver = new Receiver(receiver);

    return new Promise((resolve, reject) => {
        newReceiver.save((err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

function remove(receiver) {
    return new Promise((resolve, reject) => {
        Receiver.find({
            _id: ObjectId(receiver._id),
            userId: receiver.userId
        }).remove().exec((err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

function getPaged(userId, skip, take, query = null) {
    return new Promise((resolve, reject) => {
        let queryObj = {
            userId: ObjectId(userId)
        }

        if (query) {
            queryObj.name = {'$regex': query, '$options' : 'i'};
        }

        Receiver.find(queryObj)
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

function update(updated) {
    return new Promise((resolve, reject) => {
        Receiver.findOneAndUpdate({
            _id: ObjectId(updated._id),
            userId: ObjectId(updated.userId)
        }, updated).exec(err => {
            if (err) {
                reject(err);
            }
            resolve('successfully updated');
        })
    });
}


module.exports = {
    add,
    remove,
    getPaged,
    update
}