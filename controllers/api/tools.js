'use strict';

const cheerio = require('cheerio');
const LastFmNode = require('lastfm').LastFmNode;
const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
const User = require('../../models/User');
const url = require('url');
const ToolCheckout = require('../../services/tool');

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
            toolCheckout.getTool(toolCheckout.tool, toolCheckout.user),
            toolCheckout.getOperator(toolCheckout.operatorNumber, toolCheckout.user),
            toolCheckout.getJob(toolCheckout.jobNumber, toolCheckout.user),          
            toolCheckout.isThereEnoughTools(toolCheckout.toolQty, toolCheckout.tool.qty)
        ]).then(values => {
            const tool = values[0];

            let getOperatorNumber = () => {
                if (operator) {
                    return operator.operatorNumber;
                }
                return false;
            }

            let getJobNumber = () => {
                if (job) {
                    return job.jobNumber;
                }
                return false;
            }
            
            const operator = values[1];
            const operatorNumber = getOperatorNumber();


            const job = values[2];
            const jobNumber = getJobNumber();

            const isThereEnoughTools = values[3];
        
            let isCheckoutDataValid = toolCheckout.isCheckoutDataValid({
                toolId: tool.id,
                operatorNumber: operatorNumber,
                jobNumber: jobNumber,
                toolQty: isThereEnoughTools,
            });

            if (!isCheckoutDataValid.valid) {
                res.status(400);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(isCheckoutDataValid));
            } else {
                // TODO: Checkout
                // TODO: Return new toolObj
                res.send(200);
            }

            console.log(values);
        }).catch(err => {
            throw new Error(err);
        });
}




