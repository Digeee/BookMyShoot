const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/services.controller');

// Get services with filtering
router.get('/', serviceController.getServices);

// Get service by ID
router.get('/:id', serviceController.getServiceById);

module.exports = router;