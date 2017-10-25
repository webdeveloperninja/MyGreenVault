'use strict';

const cheerio = require('cheerio');
const LastFmNode = require('lastfm').LastFmNode;
const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
const User = require('../../models/User');
const operatorQuery = require('../../models/queries/operator');
const url = require('url');


exports.getOperators = (req, res) => {
  let url_parts = url.parse(req.url, true);
  let skip = Number(url_parts.query.skip);
  let take = Number(url_parts.query.take);
  User.find({ _id: req.user.id},{'operators':{$slice:[skip, take + 1]}}).exec((err, data) => {
    if (err) { return next(err); }

        let operators = data[0]._doc.operators;
        let operatorsArrLength = operators.length;
        let more = false;

        if(operators.length === take + 1) {
          more = true;
          operators = operators.slice(0, -1); 
        }
        
        let resObj = {
          skip: skip,
          take: take,
          more: more,
          data: operators
      }
      res.json(resObj);
  })
  
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

  doesOperatorExist(operator).then(doesOperatorExist => {
    if (doesOperatorExist) {
        res.json({"operator exists": true})
    } else {
        operatorQuery.addOperator(operator).then(operatorResponse => {
            res.send(200);
        }).catch(err => {
            res.send(500);
            throw new Error(err);
        });
    }
  });

}

exports.updateOperator = (req, res) => {
  Number(req.body.operatorNumber);
  User.findOneAndUpdate({
         _id: req.user.id,
        'operators._id': req.body._id
    },
    {
        $set: {
            'operators.$' : req.body
        }
    }, function(err, tool) {
        res.json({"success": true});
    });
}

exports.removeOperator = (req, res) => {
  User.findOneAndUpdate({
         _id: req.user.id,
        'operators._id': req.body._id
    },
    {$pull: {'operators': {'_id': req.body._id}}}, function() {
        res.json({"success": true});
    });
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