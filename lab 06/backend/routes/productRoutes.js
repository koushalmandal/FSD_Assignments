const express = require('express');
const router = express.Router();
const products = require('../data/products');

router.get('/products', (req, res) => {
  try {
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load products. Please try again.' });
  }
});

router.get('/products/:id', (req, res) => {
  try {
    const productId = Number(req.params.id);
    const product = products.find((item) => item.id === productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load product details.' });
  }
});

module.exports = router;
