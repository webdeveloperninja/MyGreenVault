module.exports = function(passportConfig, operatorsApiController) {
    'use strict';
    const router = require('express').Router();

    router.get('/', passportConfig.isAuthenticated, operatorsApiController.getOperators);
    router.post('/', passportConfig.isAuthenticated, operatorsApiController.addOperator);
    router.put('/', passportConfig.isAuthenticated, operatorsApiController.updateOperator)
    router.post('/remove', passportConfig.isAuthenticated, operatorsApiController.removeOperator);

    return router;
}