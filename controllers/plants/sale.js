const saleRepository = require('../../repositories/sale');

exports.addSale = (req, res) => {
  let sale = {};
  let salePromise;

  if (req.body._id) {
    sale = req.body;
  } else {
    sale = req.body;
    sale.userId = req.user._id;
  }

  if (sale.isQuantity) {
    salePromise = saleRepository.addQuantitySale(sale);

  } else {
    salePromise = saleRepository.addWeightedSale(sale);
  }

  salePromise.then(data => {
    res.status(200).send(data)
  }).catch(err => res.status(err.code).send(err));
};