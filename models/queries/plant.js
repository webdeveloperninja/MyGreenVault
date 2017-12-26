const User = require('../../models/User');
const Plant = require('../../models/Plant');
const ObjectId = require('mongodb').ObjectID;

let getJob = exports.getJob = (userId, jobNumber) => {
    return new Promise((resolve, reject) => {
        let queryObj = {
            userId: ObjectId(userId),
            jobNumber: jobNumber
        }

        Plant.find(queryObj)
        .limit(1)
        .exec((err, results) => {
            if (err) {
                reject(err);
            }

            if (!!results && !!results.length) {
                resolve(results[0]);
            } else {
                resolve([]);
            }
            
        });
    });
}


let addJob = exports.addJob = job => {
    const newJob = new Plant(job);

    return new Promise((resolve, reject) => {
        newJob.save((err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

let getJobs = exports.getJobs = (userId, skip, take, query = null) => {
    return new Promise((resolve, reject) => {
        let queryObj = {
            userId: ObjectId(userId)
        }

        if (query) {
            queryObj.jobName = {'$regex': query, '$options' : 'i'};
        }

        Plant.find(queryObj)
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

let updateJob = exports.updateJob = (updatedJob) => {
    return new Promise((resolve, reject) => {
        Plant.findOneAndUpdate({
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

let removeJob = exports.removeJob = (job) => {
    return new Promise((resolve, reject) => {
        Plant.find({
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

let doesJobExist = exports.doesJobExist = (userId, jobNumber) => {
    return new Promise((resolve, reject) => {
        getJob(userId, jobNumber).then(job => {   
            if (job.jobNumber) {
                resolve(true);
            } else {
                resolve(false);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

let findJobsByJobNumber = exports.findJobsByJobNumber = (userId, jobNumber) => {
    return new Promise((resolve, reject) => {
        Plant.find({
            userId: userId,
            jobNumber: jobNumber
        }).exec((err, results) => {
            if (err) {
                reject(err);
            } 
            resolve(results);
        });
    });
}