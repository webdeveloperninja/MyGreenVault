module.exports = function(passportConfig, jobsApiController) {
    'use strict';
    const router = require('express').Router();

    router.get('/', passportConfig.isAuthenticated, jobsApiController.getJobs);
    router.get('/all-jobs', passportConfig.isAuthenticated, jobsApiController.getAllJobs);
    router.post('/', passportConfig.isAuthenticated, jobsApiController.addJob);
    router.put('/', passportConfig.isAuthenticated, jobsApiController.updateJob);
    router.post('/remove', passportConfig.isAuthenticated, jobsApiController.removeJob);

    return router;
}