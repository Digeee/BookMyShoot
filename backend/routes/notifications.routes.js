/**
 * Notifications Routes
 */

const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notifications.controller');
const { authenticate } = require('../middleware/auth.middleware');

// All notification routes require authentication
router.use(authenticate);

// Get unread notifications
router.get('/unread', notificationsController.getUnread);

// Mark a notification as read
router.patch('/:id/read', notificationsController.markRead);

// Mark all notifications as read
router.patch('/read-all', notificationsController.markAllRead);

module.exports = router;