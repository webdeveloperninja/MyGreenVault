const Shipper = require('../models/Shipper');
const ObjectId = require('mongodb').ObjectID;

module.getPaged = (userId, skip, take, textQuery = null) => {
  return new Promise((resolve, reject) => {
    const query = {
      userId: ObjectId(userId)
    };

    if (textQuery) {
      query.businessName = { $regex: textQuery, $options: 'i' };
    }

    Shipper.find(query)
      .limit(take + 1)
      .skip(skip)
      .exec((err, results) => {
        if (err) {
          reject(err);
        }

        if (!!results && !!results.length) {
          const res = {
            skip: skip,
            take: take,
            more: results.length === take + 1,
            data: results.length > take ? results.slice(0, -1) : results
          };
          resolve(res);
        } else {
          resolve([]);
        }
      });
  });
}

module.add = (shipper) => {
  const newShipper = new Shipper(shipper);

  return new Promise((resolve, reject) => {
    newShipper.save((err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}

module.remove = (shipper) => {
  return new Promise((resolve, reject) => {
    Shipper.find({
      _id: ObjectId(shipper._id),
      userId: shipper.userId
    })
      .remove()
      .exec((err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
  });
}

module.update = (shipper) => {
  return new Promise((resolve, reject) => {
    Shipper.findOneAndUpdate(
      {
        _id: ObjectId(shipper._id),
        userId: ObjectId(shipper.userId)
      },
      shipper
    ).exec(err => {
      if (err) {
        reject(err);
      }
      resolve('successfully updated tool');
    });
  });
}