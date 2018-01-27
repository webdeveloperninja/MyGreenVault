'use strict';

const url = require('url');
const ObjectId = require('mongodb').ObjectID;
const receiverQuery = require('../../queries/receiver');

exports.get = (req, res) => {
    this.userId = req.user._id;

    this.url_parts = url.parse(req.url, true);
    this.skip = Number(this.url_parts.query.skip);
    this.take = Number(this.url_parts.query.take);
    this.query = this.url_parts.query.query;

    receiverQuery.getPaged(this.userId, this.skip, this.take, this.query).then(paged => {
        res.send(paged);
    }).catch(error => {
        res.send(500);
        throw new Error(error);
    });
};


exports.add = (req, res) => {
    const userId = req.user.id;
    let receiver = req.body;

    const receiverWithUserId = Object.assign({
        userId: ObjectId(userId)
    }, receiver);

    receiverQuery.add(receiverWithUserId).then(newReceiver => { 
        res.status(200).send(newReceiver._doc);
    }).catch(error => {
        res.send(500);
        throw new Error(error);
    });
}

exports.update = (req, res) => {
    const receiver = req.body;
    
    if (!receiver.userId) {
        receiver.userId = req.user._id;
    }

    receiverQuery.update(receiver).then(data => {
        res.status(200).send({success: data});
    }).catch(err => {
        res.send(500);
        throw new Error(err);
    });
}

exports.remove = (req, res) => {
    const product = req.body;

    receiverQuery.remove(product).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.send(500);
        throw new Error(err);
    });
}



