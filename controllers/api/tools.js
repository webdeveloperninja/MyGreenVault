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
                // TODO Create tool after checkout clone of tool updated qty
                const updatedTool = tool;
                    updatedTool.qty = updatedTool.qty - toolCheckout.toolCheckoutQty;
                toolCheckout.createCheckout(updatedTool, job, operator).then(data => {
                    console.log(data);
                    console.log(data);
                    // TODO send success validation 
                    // SEND Checkout Obj
                }).catch(err => {
                    throw new Error(err);
                })
            }

    })
    // TODO: Wrap req, res, next async await

    // TODO: Handle promise.All with await
    // https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8

    // TODO: Error Handling
    // https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016

    // Promise.all([
    //         toolCheckout.getTool(),
    //         toolCheckout.getOperator(),
    //         toolCheckout.getJob()
    //     ]).then(values => {
    //         if (toolCheckout.isNotValid) {
    //             res.status(400);
    //             res.setHeader('Content-Type', 'application/json');
    //             res.send(JSON.stringify(isCheckoutDataValid));
    //         } else {
    //             User.findOneAndUpdate({
    //                     _id: toolCheckout.userId,
    //                     'tools._id': toolCheckout.toolId
    //                 },
    //                 {
    //                 $set: {
    //                     'tools.$' : toolCheckout.updatedTool
    //                 }
    //                 }, function(err, tool) {
    //                     if (err)
    //                         throw new Error(err);
                            
    //                     const checkout = toolCheckout.createCheckout();

    //                     // const checkout = {
    //                     //     operatorNumber,
    //                     //     operatorName,
    //                     //     jobNumber,
    //                     //     jobName,
    //                     //     toolName,
    //                     //     toolId,
    //                     //     toolCheckoutQty: toolCheckout.toolQty
    //                     // }

                    
    //                     User.update({_id: toolCheckout.userId, 'jobs._id':toolCheckout.jobId}, {$push : 
    //                         {'jobs.$.toolCheckouts' : checkout}
    //                     }, {upsert: true}, function(err, docs){
    //                         //SUCCESS
    //                         // res.json({
    //                         //     "success": true,
    //                         //     "updatedTool": newTool,
    //                         //     "checkout": checkout
    //                         // });
    //                     });
    //                 });
    //         }

    //     }).catch(err => {
    //         throw new Error(err);
    //     });
}




