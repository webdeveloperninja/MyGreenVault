'use strict';

const cheerio = require('cheerio');
const LastFmNode = require('lastfm').LastFmNode;
const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
const User = require('../../models/User');
const url = require('url');


exports.getJobs = (req, res) => {
  let url_parts = url.parse(req.url, true);
  let skip = Number(url_parts.query.skip);
  let take = Number(url_parts.query.take);
  // improve query
  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    let more = (user._doc.jobs[skip + take] != null ? true: false);
    let resObj = {
      skip: skip,
      take: take,
      more: more,
      data: user._doc.jobs.splice(skip,take)
    }
    res.json(resObj);
  });
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
  User.findById(req.user.id, (err, user) => {
    
  });
}


exports.deleteJob = (req, res) => {

}

exports.getJob = (req, res) => {
  
}