'use strict';
const cheerio = require('cheerio');
const LastFmNode = require('lastfm').LastFmNode;
const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
const url = require('url');
const checkoutQuery = require('../../models/queries/checkout');
const jobQuery = require('../../models/queries/job');

exports.addCheckout = (req, res) => {
    let checkout = {};
    // validate that operator id doesnt exist

    if (req.body._id) {
        checkout = req.body;
    } else {
        checkout = req.body;
        checkout.userId = req.user._id;
    }

    jobQuery.getJob(checkout.userId, checkout.jobNumber).then(job => {
        
        if (job.jobNumber) {
            console.log('yeah job', job);
            res.sstatus(200);
        } else {
            res.status(400).send({ 
                jobNumber: {
                    message: 'Job Not Found '
                } 
            });
        }
    }).catch(err => {
        throw new Error(err);
    })


    // Make sure job number exists 

    // Make sure operator number exists

    // checkoutQuery.addCheckout(checkout).then(checkoutResponse => {
    //     res.send(checkoutResponse._doc);
    // }).catch(err => {
    //     res.send(500);
    //     throw new Error(err);
    // });

}