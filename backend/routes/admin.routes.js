const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

// All admin routes require authentication and admin authorization
router.use(authenticate, authorize('admin'));

// Get all users
router.get('/users', adminController.getUsers);

// Delete a user
router.delete('/users/:id', adminController.deleteUser);

// Get site statistics
router.get('/stats', adminController.getStats);

module.exports = router;