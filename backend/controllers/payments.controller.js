const db = require('../config/database');
const { catchAsync, NotFoundError } = require('../utils/errorHandler');
const { logInfo, logError } = require('../utils/logger');

// In a real implementation, you would integrate with actual payment gateways
// For now, we'll simulate the payment process

const initiatePayment = catchAsync(async (req, res) => {
  const { booking_id, amount, currency = 'LKR' } = req.body;
  const user_id = req.user.id;
  
  // Validate booking exists and belongs to user
  const [bookingRows] = await db.execute(
    'SELECT * FROM bookings WHERE id = ? AND client_id = ?',
    [booking_id, user_id]
  );
  
  if (bookingRows.length === 0) {
    throw new NotFoundError('Booking not found');
  }
  
  const booking = bookingRows[0];
  
  // Create payment record
  const [result] = await db.execute(
    'INSERT INTO payments (booking_id, amount, currency, provider, status) VALUES (?, ?, ?, ?, ?)',
    [booking_id, amount, currency, 'payhere', 'pending']
  );
  
  const payment_id = result.insertId;
  
  // In a real implementation, you would integrate with PayHere or other payment providers
  // For simulation, we'll return a mock payment URL
  const paymentUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/${payment_id}`;
  
  // Update booking with payment_id
  await db.execute(
    'UPDATE bookings SET payment_id = ? WHERE id = ?',
    [payment_id, booking_id]
  );
  
  logInfo('Payment initiated', { userId: user_id, bookingId: booking_id, paymentId: payment_id });
  
  res.json({
    success: true,
    data: {
      payment_id,
      payment_url: paymentUrl,
      message: 'Payment initiated successfully'
    }
  });
});

const handlePaymentWebhook = catchAsync(async (req, res) => {
  // In a real implementation, this would handle callbacks from payment providers
  // For simulation, we'll just log the webhook data
  logInfo('Payment webhook received', { body: req.body });
  
  // Update payment status based on webhook data
  // This is a simplified example - in reality, you'd verify the webhook signature
  const { payment_id, status } = req.body;
  
  if (payment_id && status) {
    await db.execute(
      'UPDATE payments SET status = ? WHERE id = ?',
      [status, payment_id]
    );
    
    // If payment is completed, update booking status
    if (status === 'completed') {
      await db.execute(
        'UPDATE bookings SET status = ? WHERE payment_id = ?',
        ['confirmed', payment_id]
      );
      
      logInfo('Booking confirmed after payment', { paymentId: payment_id });
    }
  }
  
  res.json({ 
    success: true,
    message: 'Webhook processed successfully' 
  });
});

const getPaymentStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  
  // Get payment details
  const [paymentRows] = await db.execute(
    'SELECT * FROM payments WHERE id = ?',
    [id]
  );
  
  if (paymentRows.length === 0) {
    throw new NotFoundError('Payment not found');
  }
  
  const payment = paymentRows[0];
  
  logInfo('Payment status fetched', { paymentId: id });
  
  res.json({
    success: true,
    data: payment
  });
});

module.exports = {
  initiatePayment,
  handlePaymentWebhook,
  getPaymentStatus
};