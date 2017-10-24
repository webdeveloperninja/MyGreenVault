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

exports.getTools = (userId, skip, take, query = null) => {
    return new Promise((resolve, reject) => {
        let queryObj = {
            userId: ObjectId(userId)
        }

        if (query) {
            queryObj.toolName = {'$regex': query, '$options' : 'i'};
        }

        Tool.find(queryObj)
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

exports.updateTool = (updatedTool) => {
    return new Promise((resolve, reject) => {
        Tool.findOneAndUpdate({
            _id: ObjectId(updatedTool._id),
            userId: ObjectId(updatedTool.userId)
        }, updatedTool).exec(err => {
            if (err) {
                reject(err);
            }
            resolve('successfully updated tool');
        })
    });
}

exports.searchTools = (userId, query, category) => {
    return new Promise((resolve, reject) => {
        // Search Query Here
    });
}