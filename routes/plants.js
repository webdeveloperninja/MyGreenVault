module.exports = function(passportConfig, plantsApiController) {
    'use strict';
    const router = require('express').Router();

    router.get('/', passportConfig.isAuthenticated, plantsApiController.getPlants);
    router.post('/', passportConfig.isAuthenticated, plantsApiController.addPlant);
    router.put('/', passportConfig.isAuthenticated, plantsApiController.updatePlant);
    router.post('/remove', passportConfig.isAuthenticated, plantsApiController.removePlant);
    router.get('/:plantNumber', passportConfig.isAuthenticated, plantsApiController.getPlant);

    router.get('/:plantNumber/expenses', passportConfig.isAuthenticated, plantsApiController.getPlantExpenses);
    router.post('/:plantNumber/expenses', passportConfig.isAuthenticated, plantsApiController.addPlantExpenses);
    router.post('/:plantNumber/expenses/remove', passportConfig.isAuthenticated, plantsApiController.removePlantExpenses);
    
    return router;
}