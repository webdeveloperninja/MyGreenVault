module.exports = function(passportConfig, jobsApiController) {
    'use strict';
    const router = require('express').Router();

    router.get('/', passportConfig.isAuthenticated, jobsApiController.getPlants);
    router.post('/', passportConfig.isAuthenticated, jobsApiController.addPlant);
    router.put('/', passportConfig.isAuthenticated, jobsApiController.updatePlant);
    router.post('/remove', passportConfig.isAuthenticated, jobsApiController.removePlant);
    router.get('/:plantNumber', passportConfig.isAuthenticated, jobsApiController.getPlant);

    router.get('/:plantNumber/expenses', passportConfig.isAuthenticated, jobsApiController.getPlantExpenses);
    router.post('/:plantNumber/expenses', passportConfig.isAuthenticated, jobsApiController.addPlantExpenses);
    router.post('/:plantNumber/expenses/remove', passportConfig.isAuthenticated, jobsApiController.removePlantExpenses);
    
    return router;
}