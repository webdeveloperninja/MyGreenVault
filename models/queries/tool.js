const User = require('../../models/User');
const Tool = require('../../models/Tool');
const ObjectId = require('mongodb').ObjectID;

// TODO: Update get tool using Tool collection
exports.getTool = (userId, toolId) => {
    return new Promise((resolve, reject) => { 
        User.findOne({ '_id': userId }, (err, user) => {
            if (err) return handleError(err);
            for (var i=0; i< user.tools.length; i++) {
                const toolId = user.tools[i]._id;
                const toolIdToCompare = toolId
                if (ObjectId(toolId) == ObjectId(toolIdToCompare)) {
                    resolve(user.tools[i]);
                    return;
                }
            }
            resolve(null);
        });
    });
}


exports.addTool = (userId, tool) => {
    const toolWithUserId = Object.assign({
        userId
    }, tool);

    const newTool = new Tool(toolWithUserId);

    return new Promise((resolve, reject) => {
        newTool.save((err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

exports.getTools = (userId, skip, take) => {
    return new Promise((resolve, reject) => {
        Tool.find({
            userId: userId
        })
        .limit(take)
        .skip(skip)
        .exec((err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
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
