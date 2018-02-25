module.exports = function(passportConfig, receiverApiController) {
  'use strict';
  const router = require('express').Router();

  router.get('/', passportConfig.isAuthenticated, receiverApiController.get);
  router.post('/', passportConfig.isAuthenticated, receiverApiController.add);
  router.put('/', passportConfig.isAuthenticated, receiverApiController.update);
  router.post(
    '/remove',
    passportConfig.isAuthenticated,
    receiverApiController.remove
  );

  return router;
};
