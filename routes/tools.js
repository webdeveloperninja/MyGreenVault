module.exports = function(passportConfig, toolsApiController) {
    'use strict';
    const router = require('express').Router();

    router.get('/', passportConfig.isAuthenticated, toolsApiController.getTools);
    router.post('/', passportConfig.isAuthenticated, toolsApiController.addTool);
    router.put('/', passportConfig.isAuthenticated, toolsApiController.updateTool);
    router.post('/remove', passportConfig.isAuthenticated, toolsApiController.removeTool);
    return router;
}