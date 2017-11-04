const User = require('../../models/User');
const Job = require('../../models/Job');
const ObjectId = require('mongodb').ObjectID;

exports.getJob = (userId, jobNumber) => {
  return new Promise((resolve, reject) => {
      User.findOne({ '_id': userId }, (err, user) => {
          if (err) return handleError(err);
          for (var i=0; i< user.jobs.length; i++) {
              const actualJobNumber = Number(user.jobs[i].jobNumber);
              const jobNumberToCompare = Number(jobNumber);
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

exports.addJob = job => {
    const newJob = new Job(job);

    return new Promise((resolve, reject) => {
        newJob.save((err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

exports.getJobs = (userId, skip, take, query = null) => {
    return new Promise((resolve, reject) => {
        let queryObj = {
            userId: ObjectId(userId)
        }

        if (query) {
            queryObj.jobName = {'$regex': query, '$options' : 'i'};
        }

        Job.find(queryObj)
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

exports.updateJob = (updatedJob) => {
    return new Promise((resolve, reject) => {
        Job.findOneAndUpdate({
            _id: ObjectId(updatedJob._id),
            userId: ObjectId(updatedJob.userId)
        }, updatedJob).exec(err => {
            if (err) {
                reject(err);
            }
            resolve('successfully updated tool');
        });
    });
}

exports.removeJob = (job) => {
    return new Promise((resolve, reject) => {
        Job.find({
            _id: ObjectId(job._id),
            userId: job.userId
        }).remove().exec((err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}