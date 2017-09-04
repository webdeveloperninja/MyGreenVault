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
    let toolCheckout = new ToolCheckout(req);

    Promise.all([
            toolCheckout.doesToolExist(toolCheckout.tool, toolCheckout.user),
            toolCheckout.doesOperatorExist(toolCheckout.operatorNumber, toolCheckout.user),
            toolCheckout.isThereEnoughTools(toolCheckout.toolQty, toolCheckout.tool.qty)
        ]).then(values => {
            const tool = values[0];
            const operator = values[1];
            const isThereEnoughTools = values[2];

            // TODO: Validate Checkout 

            // TODO: Checkout

            // TODO: Return new toolObj

            console.log(values);
        }).catch(err => {
            throw new Error('There was an error');
        });
}

class ToolCheckout {
    constructor(request) {
        this.tool = request.body.tool;
        this.toolQty = request.body.toolQty;
        this.operatorNumber = request.body.operatorNumber;
        this.user = request.user;
    }

    isThereEnoughTools() {
        return new Promise((resolve, reject) => {
            if (this.toolQty <= this.tool.qty) {
                resolve(true);
                return;
            }
            resolve(false);
        })
    }
    doesToolExist() {
        return new Promise((resolve, reject) => {
            User.findOne({ '_id': this.user.id }, (err, user) => {
                if (err) return handleError(err);
                for (var i=0; i< user.tools.length; i++) {
                    const toolId = user.tools[i].id;
                    const toolIdToCompare = this.tool._id;
                    if (toolId === toolIdToCompare) {
                        resolve(user.tools[i]);
                        return;
                    }
                }
                resolve(null);
            });
        });     
    }
    doesOperatorExist() {
        return new Promise((resolve, reject) => {
            User.findOne({ '_id': this.user.id }, (err, user) => {
                if (err) return handleError(err);
                for (var i=0; i< user.operators.length; i++) {
                    const actualOperatorNumber = user.operators[i].operatorNumber;
                    const operatorNumberToCompare = this.operatorNumber;
                    if (actualOperatorNumber === operatorNumberToCompare) {
                        resolve(user.operators[i]);
                        return;
                    }
                }
                resolve(null);
            });
        }) 
    }
}



