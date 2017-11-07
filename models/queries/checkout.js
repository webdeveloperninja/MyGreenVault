const Checkout = require('../../models/Checkout');
const ObjectId = require('mongodb').ObjectID;


let addCheckout = exports.addCheckout = (checkout) => {
    const newCheckout = new Checkout(checkout);

    return new Promise((resolve, reject) => {
        newCheckout.save((err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

let getCheckoutsForJob = exports.getCheckoutsForJob = (userId, jobNumber) => {
    return new Promise((resolve, reject) => {
        let queryObj = {
            userId: ObjectId(userId),
            jobNumber: jobNumber
        } 

        Checkout.find(queryObj).exec((err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}


