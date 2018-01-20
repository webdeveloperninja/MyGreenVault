'use strict';
const cheerio = require('cheerio');
const LastFmNode = require('lastfm').LastFmNode;
const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
const url = require('url');
const checkoutQuery = require('../../models/queries/checkout');
const operatorQuery = require('../../models/queries/operator');
// const toolQuery = require('../../models/queries/weed');


exports.addCheckout = (req, res) => {
    let checkout = {};

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
        res.status(417).send(err);
    });
}

exports.getCheckoutsForJob = (req, res) => {
    const jobNumber = req.params.jobNumber;
    const userId = req.user._id;

    checkoutQuery.getCheckoutsForJob(userId, jobNumber).then(data => {
        res.json(data);
    }).catch(err => {
        throw new Error(err);
        res.send(500);
    });

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
            operatorQuery.doesOperatorExist(checkout.userId, checkout.operatorNumber),
            jobQuery.doesJobExist(checkout.userId, checkout.jobNumber)
        ]).then(values => {
            const isThereEnoughTools = values[0];
            const doesOperatorExist = values[1];
            const doesJobExist = values[2];
            let validationReturnObj;

            const toolAfterCheckout = createToolAfterCheckout(checkout);

            if (!isThereEnoughTools || !doesOperatorExist || !doesJobExist) {
                validationReturnObj = validateCheckout(doesOperatorExist, doesJobExist, isThereEnoughTools);
                reject(validationReturnObj);
            } else {
                checkoutQuery.addCheckout(checkout).then(checkoutResponse => {
                    toolQuery.updateTool(toolAfterCheckout).then(data => {
                        resolve(true);
                    }).catch(err => {
                        reject(err);
                    });
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


function createToolAfterCheckout(checkout) {
    const updatedTool = Object.assign(checkout.tool, {
        qty: Number(checkout.tool.qty) - Number(checkout.toolQty)
    });

    return updatedTool;
}