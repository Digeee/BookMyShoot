const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookings.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

// Create a new booking (clients only)
router.post('/', authenticate, authorize('client'), bookingController.createBooking);

// Accept a booking (pros only)
router.patch('/:id/accept', authenticate, authorize('pro'), bookingController.acceptBooking);

// Reject a booking (pros only)
router.patch('/:id/reject', authenticate, authorize('pro'), bookingController.rejectBooking);

// Get user's bookings
router.get('/', authenticate, bookingController.getUserBookings);

module.exports = router;