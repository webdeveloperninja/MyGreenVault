const Product = require('../../models/Product');
const ObjectId = require('mongodb').ObjectID;

let add = exports.add = (product) => {
    const newProduct = new Product(product);

    return new Promise((resolve, reject) => {
        newProduct.save((err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

// let removeWeed = exports.removeWeed = (weed) => {
//     return new Promise((resolve, reject) => {
//         Weed.find({
//             _id: ObjectId(weed._id),
//             userId: weed.userId
//         }).remove().exec((err, result) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(result);
//         });
//     });
// }

let getPagedProducts = exports.getPagedProducts = (userId, skip, take, query = null) => {
    return new Promise((resolve, reject) => {
        let queryObj = {
            userId: ObjectId(userId)
        }

        if (query) {
            queryObj.name = {'$regex': query, '$options' : 'i'};
        }

        Product.find(queryObj)
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

// let updateWeed = exports.updateWeed = (updatedWeed) => {
//     return new Promise((resolve, reject) => {
//         Weed.findOneAndUpdate({
//             _id: ObjectId(updatedWeed._id),
//             userId: ObjectId(updatedWeed.userId)
//         }, updatedWeed).exec(err => {
//             if (err) {
//                 reject(err);
//             }
//             resolve('successfully updated weed');
//         })
//     });
// }
