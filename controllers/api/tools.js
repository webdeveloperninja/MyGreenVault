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
};

exports.addTool = (req, res) => {
    const userId = req.user.id;
    let tool = req.body;

    const toolWithUserId = Object.assign({
        userId: ObjectId(userId)
    }, tool);

    toolQuery.addTool(toolWithUserId).then(data => { 
        res.send(data._doc);
    }).catch(error => {
        res.send(500);
        throw new Error(error);
    })
 
}

exports.updateTool = (req, res) => {
    const tool = req.body;
    
    if (!tool.userId) {
        tool.userId = req.user._id;
    }

    toolQuery.updateTool(tool).then(data => {
        res.send(200);
    }).catch(err => {
        res.send(500);
        throw new Error(err);
    });
}

exports.removeTool = (req, res) => {
    const tool = req.body;

    toolQuery.removeTool(tool).then(data => {
        res.send(200);
    }).catch(err => {
        res.send(500);
        throw new Error(err);
    })
}



