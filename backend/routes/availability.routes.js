const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availability.controller');

// Get availability for a professional
router.get('/', availabilityController.getAvailability);

// Add new availability slots
router.post('/', availabilityController.addAvailability);

// Delete an availability slot
router.delete('/:id', availabilityController.deleteAvailability);

module.exports = router;