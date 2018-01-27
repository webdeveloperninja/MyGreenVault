'use strict';

const url = require('url');
const ObjectId = require('mongodb').ObjectID;
const shipperQuery = require('../../queries/shipper');

exports.get = (req, res) => {
    this.userId = req.user._id;

    this.url_parts = url.parse(req.url, true);
    this.skip = Number(this.url_parts.query.skip);
    this.take = Number(this.url_parts.query.take);
    this.query = this.url_parts.query.query;

    shipperQuery.getPaged(this.userId, this.skip, this.take, this.query).then(paged => {
        res.send(paged);
    }).catch(error => {
        res.send(500);
        throw new Error(error);
    });
};


exports.add = (req, res) => {
    this.userId = req.user.id;
    this.shipper = req.body;

    this.shipperWithUserId = Object.assign({
        userId: ObjectId(this.userId)
    }, this.shipper);

    shipperQuery.add(this.shipperWithUserId).then(newShipper => { 
        res.status(200).send(newReceiver._doc);
    }).catch(error => {
        res.send(500);
        throw new Error(error);
    });
}

exports.update = (req, res) => {
    const shipper = req.body;
    
    if (!shipper.userId) {
        shipper.userId = req.user._id;
    }

    shipperQuery.update(shipper).then(data => {
        res.status(200).send({success: data});
    }).catch(err => {
        res.send(500);
        throw new Error(err);
    });
}

exports.remove = (req, res) => {
    const shipper = req.body;

    shipperQuery.remove(shipper).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.send(500);
        throw new Error(err);
    });
}



