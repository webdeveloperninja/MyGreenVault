'use strict';

const cheerio = require('cheerio');
const LastFmNode = require('lastfm').LastFmNode;
const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });


/**
 * GET /api
 * List of API examples.
 */
exports.getJobs = (req, res) => {
  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    console.log('get jobs');
  });
};
