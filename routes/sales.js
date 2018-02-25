module.exports = function(passportConfig, saleApiController) {
  'use strict';
  const router = require('express').Router();

  router.post('/', passportConfig.isAuthenticated, saleApiController.add);

  return router;
};
