'use strict';

const url = require('url');
const ObjectId = require('mongodb').ObjectID;
const saleQuery = require('../../queries/sale');


exports.add = (req, res) => {
  const userId = req.user.id;
  let sale = req.body;

  const saleWithUserId = Object.assign(
    {
      userId: ObjectId(userId)
    },
    sale
  );

  saleQuery
    .add(saleWithUserId)
    .then(newSale => {
      res.status(200).send(newSale._doc);
    })
    .catch(error => {
      res.send(500);
      throw new Error(error);
    });
};
