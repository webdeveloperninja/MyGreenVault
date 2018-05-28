const saleController = require('../controllers/plants/sale');
const expenseController = require('../controllers/plants/expense');
const crud = require('../controllers/plants/crud');

module.exports = function (passportConfig) {
  'use strict';
  const router = require('express').Router();

  router.get('/', passportConfig.isAuthenticated, crud.getPaged);
  router.get('/all', passportConfig.isAuthenticated, crud.getAll);
  router.post('/', passportConfig.isAuthenticated, crud.add);
  router.put('/', passportConfig.isAuthenticated, crud.update);
  router.post('/remove', passportConfig.isAuthenticated, crud.remove);
  router.get('/:plantNumber', passportConfig.isAuthenticated, crud.get);

  router.post('/:plantNumber/sales', passportConfig.isAuthenticated, saleController.addSale);
  router.get('/:plantNumber/sales', passportConfig.isAuthenticated, saleController.getAll);

  router.get('/:plantNumber/expenses', passportConfig.isAuthenticated, expenseController.getAll);
  router.post('/:plantNumber/expenses', passportConfig.isAuthenticated, expenseController.add);
  router.post('/:plantNumber/expenses/remove', passportConfig.isAuthenticated, expenseController.remove);

  return router;
};