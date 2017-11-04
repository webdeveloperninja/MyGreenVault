const Checkout = require('../../models/Checkout');
const ObjectId = require('mongodb').ObjectID;


exports.addCheckout = (checkout) => {
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


