const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');

// Placeholder routes for dashboard
// In a real implementation, these would connect to dashboard controller functions

// Client dashboard routes
router.get('/client', authenticate, (req, res) => {
  res.status(200).json({ message: 'Client dashboard route' });
});

// Professional dashboard routes
router.get('/pro', authenticate, (req, res) => {
  res.status(200).json({ message: 'Professional dashboard route' });
});

// Admin dashboard routes
router.get('/admin', authenticate, (req, res) => {
  res.status(200).json({ message: 'Admin dashboard route' });
});

module.exports = router;