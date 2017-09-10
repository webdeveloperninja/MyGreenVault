const User = require('../../models/User');

exports.getJob = (userId, jobNumber) => {
  return new Promise((resolve, reject) => {
      User.findOne({ '_id': userId }, (err, user) => {
          if (err) return handleError(err);
          for (var i=0; i< user.jobs.length; i++) {
              const actualJobNumber = Number(user.jobs[i].jobNumber);
              const jobNumberToCompare = jobNumber;
              if (actualJobNumber === jobNumberToCompare) {
                  resolve(user.jobs[i]);
                  return;
              }
          }
          resolve(null);
      });
  }) 
}

exports.addCheckout = (userId, jobId, checkout) => {
  return new Promise((resolve, reject) => {
    User.update({_id: userId, 'jobs._id': jobId}, {$push : 
        {'jobs.$.toolCheckouts' : checkout}
    }, {upsert: true}, function(err, user){ 
      if (err) {
        reject(err);
      }
      resolve(user)
    });
  });
}
