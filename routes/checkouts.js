module.exports = function(passportConfig, checkoutsApiController) {
    'use strict';
    const router = require('express').Router();

    router.post('/', passportConfig.isAuthenticated, checkoutsApiController.addCheckout);
    router.get('/:jobNumber', passportConfig.isAuthenticated, checkoutsApiController.getCheckoutsForJob);

    return router;
}