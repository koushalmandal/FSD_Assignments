const express = require('express');
const router = express.Router();
const products = require('../data/products');

const DEMO_USER = {
  email: 'student@example.com',
  password: '123456',
  name: 'Demo Student'
};

const DEMO_TOKEN = 'demo-student-token';
const orders = [];

function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization || '';

  if (!authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.replace('Bearer ', '').trim();
}

function isAuthenticated(req) {
  return getTokenFromRequest(req) === DEMO_TOKEN;
}

router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    return res.status(200).json({
      token: DEMO_TOKEN,
      user: {
        email: DEMO_USER.email,
        name: DEMO_USER.name
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});

router.get('/orders', (req, res) => {
  try {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ message: 'Please login before viewing your orders.' });
    }

    const userOrders = orders.filter((order) => order.userEmail === DEMO_USER.email);
    return res.status(200).json(userOrders);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch orders right now.' });
  }
});

router.post('/orders', (req, res) => {
  try {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ message: 'Please login before placing an order.' });
    }

    const { cartItems } = req.body || {};

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty.' });
    }

    const validItems = [];
    let total = 0;

    for (const item of cartItems) {
      if (!item || typeof item.productId === 'undefined' || item.productId === null) {
        return res.status(400).json({ message: 'Invalid product selected.' });
      }

      const productId = Number(item.productId);
      const quantity = Number(item.quantity);

      if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({ message: 'Invalid product ID.' });
      }

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({ message: 'Quantity must be at least 1.' });
      }

      const product = products.find((entry) => entry.id === productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }

      if (quantity > product.stock) {
        return res.status(409).json({
          message: `Insufficient stock. Only ${product.stock} item(s) are available for ${product.name}.`
        });
      }

      const itemTotal = product.price * quantity;
      total += itemTotal;

      validItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        subtotal: itemTotal
      });
    }

    const newOrder = {
      id: Date.now(),
      userEmail: DEMO_USER.email,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      items: validItems,
      total
    };

    validItems.forEach((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      if (product) {
        product.stock -= item.quantity;
      }
    });

    orders.push(newOrder);

    return res.status(201).json({
      message: 'Order placed successfully!',
      order: newOrder
    });
  } catch (error) {
    return res.status(500).json({ message: 'Could not place the order. Please try again.' });
  }
});

module.exports = router;
