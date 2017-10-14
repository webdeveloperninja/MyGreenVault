const User = require('../../models/User');
const Tool = require('../../models/Tool');
const ObjectId = require('mongodb').ObjectID;

exports.addTool = (tool) => {
    const newTool = new Tool(tool);

    return new Promise((resolve, reject) => {
        newTool.save((err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

exports.removeTool = (tool) => {
    return new Promise((resolve, reject) => {
        Tool.find({
            _id: ObjectId(tool._id),
            userId: tool.userId
        }).remove().exec((err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

exports.getTools = (userId, skip, take) => {
    return new Promise((resolve, reject) => {
        Tool.find({
            userId: ObjectId(userId)
        })
        .limit(take + 1)
        .skip(skip)
        .exec((err, results) => {
            if (err) {
                reject(err);
            }

            if (!!results.length) {
                const resObj = {
                    skip: skip,
                    take: take,
                    more: (results.length === take + 1),
                    data: (results.length > take) ? results.slice(0, -1) : results
                }
                resolve(resObj);
            }
        });
    });
}

// TODO: update with the Tool collection
exports.updateTool = (userId, updatedTool) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({
          _id: userId,
          'tools._id': updatedTool._id
      },
      {
      $set: {
          'tools.$' : updatedTool
      }
      }, (err, tool) => {
        if (err) {
          reject(err);
        }
        resolve(tool);
      });
  });
}
