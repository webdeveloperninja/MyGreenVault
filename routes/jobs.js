module.exports = function(passportConfig, jobsApiController) {
    'use strict';
    const router = require('express').Router();

    router.get('/', passportConfig.isAuthenticated, jobsApiController.getJobs);
    router.post('/', passportConfig.isAuthenticated, jobsApiController.addJob);
    router.put('/', passportConfig.isAuthenticated, jobsApiController.updateJob);
    router.post('/remove', passportConfig.isAuthenticated, jobsApiController.removeJob);
    router.get('/:jobNumber', passportConfig.isAuthenticated, jobsApiController.getJob);
    
    return router;
}