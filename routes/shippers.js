module.exports = function(passportConfig, shippersApiController) {
    'use strict';
    const router = require('express').Router();

    router.get('/', passportConfig.isAuthenticated, shippersApiController.get);
    router.post('/', passportConfig.isAuthenticated, shippersApiController.add);
    router.put('/', passportConfig.isAuthenticated, shippersApiController.update)
    router.post('/remove', passportConfig.isAuthenticated, shippersApiController.remove);

    return router;
}