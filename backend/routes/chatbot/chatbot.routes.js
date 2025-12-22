/**
 * Chatbot Routes
 */

const express = require('express');
const router = express.Router();
const chatbotController = require('../../controllers/chatbot/chatbot.controller');
const { authenticate } = require('../../middleware/auth.middleware');

// Public routes
router.post('/message', chatbotController.handleMessage);

// Protected routes (require authentication)
router.get('/history', authenticate, chatbotController.getHistory);
router.delete('/reset', authenticate, chatbotController.resetContext);

module.exports = router;