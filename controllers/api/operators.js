'use strict';

const cheerio = require('cheerio');
const LastFmNode = require('lastfm').LastFmNode;
const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
const User = require('../../models/User');
const operatorQuery = require('../../models/queries/operator');
const url = require('url');


exports.getOperators = (req, res) => {
    const userId = req.user._id;
    let url_parts = url.parse(req.url, true);
    let skip = Number(url_parts.query.skip);
    let take = Number(url_parts.query.take);
    let category = url_parts.query.category;
    let query = url_parts.query.query;

    operatorQuery.getOperators(userId, skip, take, query).then(operators => {
        res.send(operators)
    }).catch(error => {
        res.send(500);
        throw new Error(error);
    });
};

exports.getOperator = (userId, operatorNumber) => {
    operatorQuery.getOperator(userId, operatorNumber).then(operator => {

    }).catch(err => {
        res.send(500);
        throw new Error(err);
    })
}


exports.addOperator = (req, res) => {
    let operator = {};

    // validate that operator id doesnt exist

    if (req.body._id) {
        operator = req.body;
    } else {
        operator = req.body;
        operator.userId = req.user._id;
    }

    operatorQuery.addOperator(operator).then(operatorResponse => {
        res.send(operatorResponse._doc);
    }).catch(err => {
        res.send(500);
        throw new Error(err);
    });

}

exports.updateOperator = (req, res) => {
    const operator = req.body;
    
    if (!operator.userId) {
        operator.userId = req.user._id;
    }

    operatorQuery.updateOperator(operator).then(data => {
        res.send(200);
    }).catch(err => {
        res.send(500);
        throw new Error(err);
    });
}

exports.removeOperator = (req, res) => {
    const operator = req.body;

    operatorQuery.removeOperator(operator).then(data => {
        res.send(200);
    }).catch(err => {
        res.send(500);
        throw new Error(err);
    })
}


function doesOperatorExist(operator) {
    return new Promise((reject, resolve) => {
        operatorQuery.getOperator(operator.userId, operator.operatorNumber).then(operator => {
            if (operator.length > 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        }).catch(err => {
            reject(err);
            throw new Error(err);
        })
    })
}