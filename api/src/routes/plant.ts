const sale = require('../controllers/sale');
const expense = require('../controllers/expense');
const plant = require('../controllers/plant');
const passportMiddleware = require('../middleware/passport');
const weeks = require('../controllers/weeks');

module.exports = function() {
  'use strict';
  const router = require('express').Router();

  router.get('/', plant.getPaged);
  router.get('/all', plant.getAll);
  router.post('/', plant.add);
  router.put('/', plant.update);
  router.post('/remove', plant.remove);
  router.get('/:plantId', plant.get);
  router.post('/:plantNumber/profile-image', plant.uploadPlantProfilePhoto);

  router.post('/weeks', weeks.get);
  router.post('/:plantId/sales', sale.addSale);
  router.get('/:plantId/sales', sale.getAll);
  router.post('/:plantId/sales/remove', sale.remove);

  router.get('/:plantNumber/expenses', expense.getAll);
  router.post('/:plantNumber/expenses', expense.add);
  router.post('/:plantNumber/expenses/remove', expense.remove);

  return router;
};
