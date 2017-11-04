'use strict';
const cheerio = require('cheerio');
const LastFmNode = require('lastfm').LastFmNode;
const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
const url = require('url');
const checkoutQuery = require('../../models/queries/checkout');
const jobQuery = require('../../models/queries/job');
const operatorQuery = require('../../models/queries/operator');

exports.addCheckout = (req, res) => {
    let checkout = {};
    // validate that operator id doesnt exist

    if (req.body._id) {
        checkout = req.body;
    } else {
        checkout = req.body;
        checkout.userId = req.user._id;
    }

    doesJobExist(checkout).then(doesJobExist => {
        if (doesJobExist) {
            doesOperatorExist(checkout.userId, checkout.operatorNumber).then(doesOperatorExist => {
                if (doesOperatorExist) {
                    isThereEnoughTools(checkout).then(isThereEnoughTools => {
                        if (isThereEnoughTools) {
                        
                            checkoutQuery.addCheckout(checkout).then(checkoutResponse => {
                                // res.send(checkoutResponse._doc);
                                res.send(200);
                            }).catch(err => {
                                res.send(500);
                                throw new Error(err);
                            });

                        } else {
                            res.status(400).send({
                                toolQty: {
                                    message: 'Not Enough Tools',
                                    status: 'danger'
                                }
                            })
                        }
                    });
                } else {
                    res.status(400).send({
                        operatorNumber: {
                            message: 'Operator Not Found',
                            status: 'danger'
                        }
                    });
                }
            }).catch(err => {
                throw new Error(err);
                res.send(500);
            });
        } else {
            res.status(400).send({ 
                jobNumber: {
                    message: 'Job Not Found',
                    status: 'danger'
                } 
            });
        }
    }).catch(err => {
        throw new Error(err);
        res.send(500);
    });

    // Make sure job number exists 

    // Make sure operator number exists

}

function doesJobExist(checkout) {
    return new Promise((resolve, reject) => {
        jobQuery.getJob(checkout.userId, checkout.jobNumber).then(job => {   
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

function doesOperatorExist(userId, operatorNumber) {
    return new Promise((resolve, reject) => {
        operatorQuery.getOperator(userId, operatorNumber).then(operator => {
            if (operator && operator.operatorNumber) {
                resolve(true);
            } else {
                resolve(false);
            }
        }).catch(err => {
            reject(err);
        })
    })
}

function isThereEnoughTools(checkout) {
    return new Promise((resolve, reject) => {
        if (checkout.toolQty > checkout.tool.qty) {
            resolve(false);
        } else {
            resolve(true);
        }
    });
}