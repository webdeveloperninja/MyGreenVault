'use strict';

const url = require('url');
const ObjectId = require('mongodb').ObjectID;
const receiverQuery = require('../../models/queries/receiver');

exports.get = (req, res) => {
    const userId = req.user._id;

    const url_parts = url.parse(req.url, true);
    const skip = Number(url_parts.query.skip);
    const take = Number(url_parts.query.take);
    const query = url_parts.query.query;

    receiverQuery.getPaged(userId, skip, take, query).then(paged => {
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

    receiverQuery.removeProduct(product).then(data => {
        res.send(200);
    }).catch(err => {
        res.send(500);
        throw new Error(err);
    });
}



