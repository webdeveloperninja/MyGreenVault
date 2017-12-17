'use strict';

const cheerio = require('cheerio');
const LastFmNode = require('lastfm').LastFmNode;
const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
const User = require('../../models/User');
const url = require('url');
const WeedCheckout = require('../../services/weed');
const ObjectId = require('mongodb').ObjectID;
const productQuery = require('../../models/queries/product');
const asyncMiddleware = require('../../utils/async-middleware');

exports.getAll = (req, res) => {
    const userId = req.user._id;
    let url_parts = url.parse(req.url, true);
    let skip = Number(url_parts.query.skip);
    let take = Number(url_parts.query.take);
    let category = url_parts.query.category;
    let query = url_parts.query.query;

    productQuery.getPagedProducts(userId, skip, take, query).then(weed => {
        res.send(weed)
    }).catch(error => {
        res.send(500);
        throw new Error(error);
    });
};


exports.add = (req, res) => {
    const userId = req.user.id;
    let product = req.body;

    const productWithUserId = Object.assign({
        userId: ObjectId(userId)
    }, product);

    productQuery.add(productWithUserId).then(newProduct => { 
        res.send(newProduct._doc);
    }).catch(error => {
        res.send(500);
        throw new Error(error);
    })
 
}

exports.update = (req, res) => {
    const weed = req.body;
    
    if (!weed.userId) {
        weed.userId = req.user._id;
    }

    productQuery.updateWeed(weed).then(data => {
        res.send(200);
    }).catch(err => {
        res.send(500);
        throw new Error(err);
    });
}

exports.remove = (req, res) => {
    const weed = req.body;

    productQuery.removeWeed(weed).then(data => {
        res.send(200);
    }).catch(err => {
        res.send(500);
        throw new Error(err);
    })
}



