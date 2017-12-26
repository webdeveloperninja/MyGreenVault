'use strict';
const cheerio = require('cheerio');
const LastFmNode = require('lastfm').LastFmNode;
const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
const User = require('../../models/User');
const url = require('url');
const jobQuery = require('../../models/queries/job');


exports.getJobs = (req, res) => {
    const userId = req.user._id;
    let url_parts = url.parse(req.url, true);
    let skip = Number(url_parts.query.skip);
    let take = Number(url_parts.query.take);
    let query = url_parts.query.query;

    jobQuery.getJobs(userId, skip, take, query).then(jobs => {
        res.send(jobs)
    }).catch(error => {
        res.send(500);
        throw new Error(error);
    });
};

exports.getJob = (req, res) => {
    const jobNumber = req.params.jobNumber;
    const userId = req.user._id;

    jobQuery.getJob(userId, jobNumber).then(job => {
        res.json(job);
    }).catch(err => {
        res.send(500);
        throw new Error(err);
    });
}

exports.addJob = (req, res) => {
    let job = {};

    if (req.body._id) {
        job = req.body;
    } else {
        job = req.body;
        job.userId = req.user._id;
    }

    doAddJob(req.user._id, job, res).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(err.code).send(err);
    })
}

exports.updateJob = (req, res) => {
    const job = req.body;
    
    if (!job.userId) {
        job.userId = req.user._id;
    }

    doUpdateJob(req.user._id, job).then(data => {
        res.send(200);
    }).catch(err => {
        res.status(err.code).send(err);
    })

}

exports.removeJob = (req, res) => {
    const job = req.body;

    jobQuery.removeJob(job).then(data => {
        res.send(200);
    }).catch(err => {
        res.send(500);
        throw new Error(err);
    });
}

function doUpdateJob(userId, job) {
    return new Promise((resolve, reject) => {
        Promise.all([
            // Only returning 1 job not all 
            jobQuery.findJobsByJobNumber(userId, job.jobNumber)
        ]).then(data => {
            if (data) {
                jobQuery.updateJob(job).then(data => {
                    resolve(true);
                }).catch(err => {
                    reject({
                        code: 417,
                        message: `Job with job number ${data[0].jobNumber} exists please use another one`,
                        status: 'danger'
                    })
                });
            } else {
                reject({
                    code: 417,
                    message: `Job with job number ${data[0].jobNumber} exists please use another one`,
                    status: 'danger'
                });
            }
        });
    });
}

function getJob(userId, jobNumber) {
    return new Promise((resolve, reject) => {
        jobQuery.getJob(userId, jobNumber).then(job => {
            resolve(job);
        }).catch(err => {
            reject(err);
        });
    });
}

function doAddJob(userId, job) {
    return new Promise((resolve, reject) => {
        Promise.all([
            getJob(userId, job.jobNumber)
        ]).then(data => {
            if (!data[0].jobNumber) {
                jobQuery.addJob(job).then(jobResponse => {
                    resolve(jobResponse._doc);
                }).catch(err => {
                    reject({
                        code: 500,
                        message: err
                    });
                });
            } else {
                reject({
                    code: 417,
                    message: `Job with job number ${data[0].jobNumber} exists please use another one`,
                    status: 'danger'
                });
            }
        });
    });
}