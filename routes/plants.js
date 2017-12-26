module.exports = function(passportConfig, jobsApiController) {
    'use strict';
    const router = require('express').Router();

    router.get('/', passportConfig.isAuthenticated, jobsApiController.getPlants);
    router.post('/', passportConfig.isAuthenticated, jobsApiController.addPlant);
    router.put('/', passportConfig.isAuthenticated, jobsApiController.updatePlant);
    router.post('/remove', passportConfig.isAuthenticated, jobsApiController.removePlant);
    router.get('/:plantNumber', passportConfig.isAuthenticated, jobsApiController.getPlant);
    
    return router;
}