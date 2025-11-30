const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payments.controller');
const { authenticate } = require('../middleware/auth.middleware');

// All payment routes require authentication
router.use(authenticate);

// Initiate a payment
router.post('/checkout', paymentController.initiatePayment);

// Handle payment webhook (for payment provider callbacks)
router.post('/webhook', paymentController.handlePaymentWebhook);

// Get payment status
router.get('/:id', paymentController.getPaymentStatus);

module.exports = router;