/**
 * Chatbot Admin Routes
 */

const express = require('express');
const router = express.Router();
const chatbotAdminController = require('../../controllers/chatbot/chatbot.admin.controller');
const { authenticate, authorize } = require('../../middleware/auth.middleware');

// Admin routes (require admin authentication)
router.get('/analytics', authenticate, authorize('admin'), chatbotAdminController.getAnalyticsData);
router.get('/conversations', authenticate, authorize('admin'), chatbotAdminController.getRecentConversations);

module.exports = router;