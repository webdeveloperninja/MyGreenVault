'use strict';

const cheerio = require('cheerio');
const LastFmNode = require('lastfm').LastFmNode;
const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
const User = require('../../models/User');
const url = require('url');
const ToolCheckout = require('../../services/tool');
const ObjectId = require('mongodb').ObjectID;
const toolQuery = require('../../models/queries/tool');
const asyncMiddleware = require('../../utils/async-middleware');



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
    let toolCheckout = new ToolCheckout(req, res);
    
    Promise.all([
        toolCheckout.getTool(),
        toolCheckout.getOperator(),
        toolCheckout.getJob()
        ]).then(values => {
            const [tool, operator, job] = values;

            let isCheckoutDataValid = toolCheckout.isCheckoutDataValid({
                tool,
                operator,
                job
            });

            if (!isCheckoutDataValid.valid) {
                res.status(400);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(isCheckoutDataValid));
            } else {
                const updatedTool = tool;
                    updatedTool.qty = updatedTool.qty - toolCheckout.toolCheckoutQty;
                toolCheckout.createCheckout(updatedTool, job, operator).then(data => {
                    res.status(200);
                    res.json({success: true});
                }).catch(err => {
                    res.send(500);
                    res.json({success: false});
                    throw new Error(err);
                })
            }

    });
}




