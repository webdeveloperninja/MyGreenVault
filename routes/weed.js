module.exports = function(passportConfig, weedApiController) {
    'use strict';
    const router = require('express').Router();

    router.get('/', passportConfig.isAuthenticated, weedApiController.getWeed);
    router.post('/', passportConfig.isAuthenticated, weedApiController.addWeed);
    router.put('/', passportConfig.isAuthenticated, weedApiController.updateWeed);
    router.post('/remove', passportConfig.isAuthenticated, weedApiController.removeWeed);
    
    return router;
}