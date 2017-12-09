'use strict';

const cheerio = require('cheerio');
const LastFmNode = require('lastfm').LastFmNode;
const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
const User = require('../../models/User');
const url = require('url');
const WeedCheckout = require('../../services/weed');
const ObjectId = require('mongodb').ObjectID;
const weedQuery = require('../../models/queries/weed');
const asyncMiddleware = require('../../utils/async-middleware');

exports.getWeed = (req, res) => {
    const userId = req.user._id;
    let url_parts = url.parse(req.url, true);
    let skip = Number(url_parts.query.skip);
    let take = Number(url_parts.query.take);
    let category = url_parts.query.category;
    let query = url_parts.query.query;

    weedQuery.getWeed(userId, skip, take, query).then(weed => {
        res.send(weed)
    }).catch(error => {
        res.send(500);
        throw new Error(error);
    });
};


exports.addWeed = (req, res) => {
    const userId = req.user.id;
    let weed = req.body;

    const weedWithUserId = Object.assign({
        userId: ObjectId(userId)
    }, tool);

    weedQuery.addWeed(weedWithUserId).then(data => { 
        res.send(data._doc);
    }).catch(error => {
        res.send(500);
        throw new Error(error);
    })
 
}

exports.updateWeed = (req, res) => {
    const weed = req.body;
    
    if (!weed.userId) {
        weed.userId = req.user._id;
    }

    weedQuery.updateWeed(weed).then(data => {
        res.send(200);
    }).catch(err => {
        res.send(500);
        throw new Error(err);
    });
}

exports.removeWeed = (req, res) => {
    const weed = req.body;

    weedQuery.removeWeed(weed).then(data => {
        res.send(200);
    }).catch(err => {
        res.send(500);
        throw new Error(err);
    })
}



