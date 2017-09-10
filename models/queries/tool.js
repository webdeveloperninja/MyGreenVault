const User = require('../../models/User');

exports.getTool = (userId, toolId) => {
  return new Promise((resolve, reject) => { 
    User.findOne({ '_id': userId }, (err, user) => {
      if (err) return handleError(err);
      for (var i=0; i< user.tools.length; i++) {
          const toolId = user.tools[i]._id;
          const toolIdToCompare = toolId
          if (toolId === toolIdToCompare) {
              resolve(user.tools[i]);
              return;
          }
      }
      resolve(null);
    });
  });
}

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
