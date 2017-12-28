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

    router.get('/:plantNumber/todos', passportConfig.isAuthenticated, plantsApiController.getPlantTodos);
    router.post('/:plantNumber/todos', passportConfig.isAuthenticated, plantsApiController.addPlantTodo);
    router.post('/:plantNumber/todos/remove', passportConfig.isAuthenticated, plantsApiController.removePlantTodo);

    router.get('/:plantNumber/notes', passportConfig.isAuthenticated, plantsApiController.getPlantNotes);
    router.post('/:plantNumber/notes', passportConfig.isAuthenticated, plantsApiController.addPlantNote);
    router.post('/:plantNumber/notes/remove', passportConfig.isAuthenticated, plantsApiController.removePlantNote);
    
    return router;
}