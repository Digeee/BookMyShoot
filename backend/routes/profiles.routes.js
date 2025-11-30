const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profiles.controller');

// Get profile by user ID
router.get('/:id', profileController.getProfile);

// Update profile (authenticated user only)
router.put('/:id', profileController.updateProfile);

module.exports = router;