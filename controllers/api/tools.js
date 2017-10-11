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
    const userId = req.user._id;
    let url_parts = url.parse(req.url, true);
    let skip = Number(url_parts.query.skip);
    let take = Number(url_parts.query.take);

    toolQuery.getTools(userId, skip, take).then(tools => {
        res.send(tools)
    }).catch(error => {
        res.send(500);
        throw new Error(error);
    });

//   User.find({ _id: req.user.id},{'tools':{$slice:[skip, take + 1]}}).exec((err, data) => {
//     if (err) { return next(err); }

//         let tools = data[0]._doc.tools;
//         let toolsArrLength = tools.length;
//         let more = false;

//         if(tools.length === take + 1) {
//           more = true;
//           tools = tools.slice(0, -1); 
//         }
        
//         let resObj = {
//           skip: skip,
//           take: take,
//           more: more,
//           data: tools
//       }
//       res.json(resObj);
//   })
  
};

  

exports.addTool = (req, res) => {
    const userId = req.user.id;
    Number(req.body.qty);
    Number(req.body.idealAmount);
    Number(req.body.autoOrderQty);

    toolQuery.addTool(req.user.id, req.body).then(data => {
        res.send(data._doc);
    }).catch(error => {
        res.send(500);
        throw new Error(error);
    })
 
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
    }, (err, tool) => {
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
    // TODO Pass tool checkout packaged data not req and res
    let toolCheckout = new ToolCheckout(req, res);

    toolCheckout.doCheckout().then(data => {
        res.json({"success": true});
    }).catch(error => {
        res.send(500);
        throw new Error(error);
    })

}




