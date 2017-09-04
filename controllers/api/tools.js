'use strict';

const cheerio = require('cheerio');
const LastFmNode = require('lastfm').LastFmNode;
const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
const User = require('../../models/User');
const url = require('url');


exports.getTools = (req, res) => {
  let url_parts = url.parse(req.url, true);
  let skip = Number(url_parts.query.skip);
  let take = Number(url_parts.query.take);
  User.find({ _id: req.user.id},{'tools':{$slice:[skip, take + 1]}}).exec((err, data) => {
    if (err) { return next(err); }

        let tools = data[0]._doc.tools;
        let toolsArrLength = tools.length;
        let more = false;

        if(tools.length === take + 1) {
          more = true;
          tools = tools.slice(0, -1); 
        }
        
        let resObj = {
          skip: skip,
          take: take,
          more: more,
          data: tools
      }
      res.json(resObj);
  })
  
};

  

exports.addTool = (req, res) => {
  Number(req.body.qty)
  Number(req.body.idealAmount)
  Number(req.body.autoOrderQty)
  User.findOneAndUpdate(
      {_id: req.user.id},
      {$push: {tools: req.body}},
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

exports.updateTool = (req, res) => {
  User.findOneAndUpdate({
         _id: req.user.id,
        'tools._id': req.body._id
    },
    {
        $set: {
            'tools.$' : req.body
        }
    }, function(err, tool) {
        res.json({"success": true});
    });
}

exports.removeTool = (req, res) => {
  User.findOneAndUpdate({
         _id: req.user.id,
        'tools._id': req.body._id
    },
    {$pull: {'tools': {'_id': req.body._id}}}, function() {
        res.json({"success": true});
    });
}

exports.checkoutTool = (req, res) => {
    let toolCheckout = new ToolCheckout(req.body.tool, req.body.toolQty, req.body.operatorNumber, req.user);

    Promise.all([
            doesToolExist(toolCheckout.tool, toolCheckout.user),
            doesOperatorExist(toolCheckout.operatorNumber, toolCheckout.user),
            isThereEnoughTools(toolCheckout.toolQty, toolCheckout.tool.qty)
        ]).then(values => {
            const tool = values[0];
            const operator = values[1];
            const isThereEnoughTools = values[2];
            console.log(values);
        }).catch(err => {
            throw new Error('There was an error');
        });
}


class ToolCheckout {
    constructor(tool, toolQty, operatorNumber, user) {
        this.tool = tool;
        this.toolQty = toolQty;
        this.operatorNumber = operatorNumber;
        this.user = user;
    }
}

const isThereEnoughTools = (numberToCheckout, totalToolQty) => {
    return new Promise((resolve, reject) => {
        if (numberToCheckout <= totalToolQty) {
            resolve(true);
            return;
        }
        resolve(false);
    })
}

const doesToolExist = (tool, user) => {
    return new Promise((resolve, reject) => {
        User.findOne({ '_id': user.id }, function (err, user) {
            if (err) return handleError(err);
            for (var i=0; i< user.tools.length; i++) {
                const toolId = user.tools[i].id;
                const toolIdToCompare = tool._id;
                if (toolId === toolIdToCompare) {
                    resolve(user.tools[i]);
                    return;
                }
            }
            resolve(null);
        });
    }) 
}

const doesOperatorExist = (operatorNumber, user) => {
    return new Promise((resolve, reject) => {
        User.findOne({ '_id': user.id }, function (err, user) {
            if (err) return handleError(err);
            for (var i=0; i< user.operators.length; i++) {
                const actualOperatorNumber = user.operators[i].operatorNumber;
                const operatorNumberToCompare = operatorNumber;
                if (actualOperatorNumber === operatorNumberToCompare) {
                    resolve(user.operators[i]);
                    return;
                }
            }
            resolve(null);
        });
    }) 
}



