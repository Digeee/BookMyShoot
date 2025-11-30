const db = require('../config/database');

// In a real implementation, you would integrate with actual payment gateways
// For now, we'll simulate the payment process

const initiatePayment = async (req, res) => {
  try {
    const { booking_id, amount, currency = 'LKR' } = req.body;
    const user_id = req.user.id;
    
    // Validate booking exists and belongs to user
    const [bookingRows] = await db.execute(
      'SELECT * FROM bookings WHERE id = ? AND client_id = ?',
      [booking_id, user_id]
    );
    
    if (bookingRows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
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
    
    res.json({
      payment_id,
      payment_url: paymentUrl,
      message: 'Payment initiated successfully'
    });
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({ error: 'Server error while initiating payment' });
  }
};

const handlePaymentWebhook = async (req, res) => {
  try {
    // In a real implementation, this would handle callbacks from payment providers
    // For simulation, we'll just log the webhook data
    console.log('Payment webhook received:', req.body);
    
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
      }
    }
    
    res.json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Error processing payment webhook:', error);
    res.status(500).json({ error: 'Server error while processing webhook' });
  }
};

const getPaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get payment details
    const [paymentRows] = await db.execute(
      'SELECT * FROM payments WHERE id = ?',
      [id]
    );
    
    if (paymentRows.length === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    
    const payment = paymentRows[0];
    
    res.json(payment);
  } catch (error) {
    console.error('Error fetching payment status:', error);
    res.status(500).json({ error: 'Server error while fetching payment status' });
  }
};

module.exports = {
  initiatePayment,
  handlePaymentWebhook,
  getPaymentStatus
};