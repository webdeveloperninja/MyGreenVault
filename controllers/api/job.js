'use strict';

const cheerio = require('cheerio');
const LastFmNode = require('lastfm').LastFmNode;
const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
const User = require('../../models/User');
const url = require('url');


exports.getAllJobs = (req, res) => {
  User.find({ _id: req.user.id}, 'jobs').exec((err, data) => {
    if (err) { return next(err); }
      res.json(data[0].jobs);
  })
  
};

exports.getJobs = (req, res) => {
  let url_parts = url.parse(req.url, true);
  let skip = Number(url_parts.query.skip);
  let take = Number(url_parts.query.take);
  User.find({ _id: req.user.id},{'jobs':{$slice:[skip, take + 1]}}).exec((err, data) => {
    if (err) { return next(err); }

        let jobs = data[0]._doc.jobs;
        let jobsArrLength = jobs.length;
        let more = false;

        if(jobs.length === take + 1) {
          more = true;
          jobs = jobs.slice(0, -1); 
        }
        
        let resObj = {
          skip: skip,
          take: take,
          more: more,
          data: jobs
      }
      res.json(resObj);
  })
  
};

exports.addJob = (req, res) => {
  User.findOneAndUpdate(
      {_id: req.user.id},
      {$push: {jobs: req.body}},
      {safe: true, upsert: true},
      function(err, model) {
          if(err)
            res.json({"error": true})
          else 
            res.json({"success": true})
      }
  );  
}

exports.updateJob = (req, res) => {
  User.findOneAndUpdate({
         _id: req.user.id,
        'jobs._id': req.body._id
    },
    {
        $set: {
            'jobs.$' : req.body
        }
    }, function(err, job) {
        res.json({"success": true});
    });
}

exports.removeJob = (req, res) => {
  User.findOneAndUpdate({
         _id: req.user.id,
        'jobs._id': req.body._id
    },
    {$pull: {'jobs': {'_id': req.body._id}}}, function() {
        res.json({"success": true});
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
