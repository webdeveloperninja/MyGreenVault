'use strict';
const cheerio = require('cheerio');
const LastFmNode = require('lastfm').LastFmNode;
const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
const User = require('../../models/User');
const url = require('url');
const jobQuery = require('../../models/queries/job');


exports.getAllJobs = (req, res) => {
  User.find({ _id: req.user.id}, 'jobs').exec((err, data) => {
    if (err) { return next(err); }
      res.json(data[0].jobs);
  })
  
};

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
  })
}

exports.addJob = (req, res) => {
    let job = {};

    // validate that operator id doesnt exist

    if (req.body._id) {
        job = req.body;
    } else {
        job = req.body;
        job.userId = req.user._id;
    }

    jobQuery.addJob(job).then(jobResponse => {
        res.send(jobResponse._doc);
    }).catch(err => {
        res.send(500);
        throw new Error(err);
    });

}

exports.updateJob = (req, res) => {
    const job = req.body;
    
    if (!job.userId) {
        job.userId = req.user._id;
    }

    jobQuery.updateJob(job).then(data => {
        res.send(200);
    }).catch(err => {
        res.send(500);
        throw new Error(err);
    });
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

exports.searchJobs = (req, res) => {
  let url_parts = url.parse(req.url, true);
  let searchQuery = url_parts.query.search;
  
  // search for jobs by name or job number 
  User.find({ _id: req.user.id}, 'jobs').exec((err, data) => {
    if (err) { return next(err); }
      res.json(data[0].jobs);
  })
};
