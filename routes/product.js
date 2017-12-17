module.exports = function(passportConfig, productApiController) {
    'use strict';
    const router = require('express').Router();

    router.get('/', passportConfig.isAuthenticated, productApiController.getAll);
    router.post('/', passportConfig.isAuthenticated, productApiController.add);
    router.put('/', passportConfig.isAuthenticated, productApiController.update);
    router.post('/remove', passportConfig.isAuthenticated, productApiController.remove);
    
    return router;
}