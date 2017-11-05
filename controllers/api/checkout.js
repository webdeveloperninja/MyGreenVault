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

    doCheckout(checkout).then(isCheckedOut => {
        if(isCheckedOut) {
            res.status(200).send('checkout successfull');
        }
    }).catch(err => {
        res.status(400).send(err);
    });


}

function doesJobExist(userId, jobNumber) {
    return new Promise((resolve, reject) => {
        jobQuery.getJob(userId, jobNumber).then(job => {   
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

function doCheckout(checkout) {
    return new Promise((resolve, reject) => {
        Promise.all([
            isThereEnoughTools(checkout),
            doesOperatorExist(checkout.userId, checkout.operatorNumber),
            doesJobExist(checkout.userId, checkout.jobNumber)
        ]).then(values => {
            const isThereEnoughTools = values[0];
            const doesOperatorExist = values[1];
            const doesJobExist = values[2];
            let validationReturnObj;

            if (!isThereEnoughTools || !doesOperatorExist || !doesJobExist) {
                validationReturnObj = validateCheckout(doesOperatorExist, doesJobExist, isThereEnoughTools);
                reject(validationReturnObj);
            } else {
                checkoutQuery.addCheckout(checkout).then(checkoutResponse => {
                    resolve(true);
                }).catch(err => {
                    reject(err);
                });
            }
        


        }).catch(err => {
            reject(err);
        });
    });
}


function validateCheckout(doesOperatorExist, doesJobExist, isThereEnoughTools) {
    let validationObj = {};
        validationObj.valid = true;

    if (!isThereEnoughTools) {
        validationObj.toolQty = {
            status: 'danger',
            message: 'There is not enough tools'
        }
        validationObj.valid = false;
    }
    if (!doesOperatorExist) {
        validationObj.operatorNumber = {
            status: 'danger',
            message: 'Operator Not Found'
        }
        validationObj.valid = false;
    }
    if (!doesJobExist) {
        validationObj.jobNumber = {
            status: 'danger',
            message: 'Job number not found'
        }
        validationObj.valid = false;
    }

    return validationObj;
}