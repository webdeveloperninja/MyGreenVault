'use strict';

const cheerio = require('cheerio');
const LastFmNode = require('lastfm').LastFmNode;
const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
const User = require('../../models/User');
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

  

exports.addOperator = (req, res) => {
  Number(req.body.qty)
  Number(req.body.idealAmount)
  Number(req.body.autoOrderQty)
  User.findOneAndUpdate(
      {_id: req.user.id},
      {$push: {operators: req.body}},
      {safe: true, upsert: true},
      function(err, model) {
        if(err) {
            console.log(err);
            res.json({"error": true})
        } else {
            res.json({"success": true})
        }
           
      }
  );  
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
