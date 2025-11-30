const db = require('../config/database');

const createBooking = async (req, res) => {
  try {
    const { service_id, package_id, date, start_time, end_time } = req.body;
    const client_id = req.user.id;
    
    // Validate service exists and is active
    const [serviceRows] = await db.execute(
      'SELECT pro_id, base_price FROM services WHERE id = ? AND is_active = 1',
      [service_id]
    );
    
    if (serviceRows.length === 0) {
      return res.status(404).json({ error: 'Service not found or inactive' });
    }
    
    const service = serviceRows[0];
    const pro_id = service.pro_id;
    
    // Validate package if provided
    let price = service.base_price;
    if (package_id) {
      const [packageRows] = await db.execute(
        'SELECT price FROM packages WHERE id = ? AND service_id = ?',
        [package_id, service_id]
      );
      
      if (packageRows.length === 0) {
        return res.status(404).json({ error: 'Package not found' });
      }
      
      price = packageRows[0].price;
    }
    
    // Check if slot is available
    const [availabilityRows] = await db.execute(
      'SELECT id FROM availability WHERE pro_id = ? AND date = ? AND start_time <= ? AND end_time >= ? AND is_booked = 0',
      [pro_id, date, start_time, end_time]
    );
    
    if (availabilityRows.length === 0) {
      return res.status(409).json({ error: 'Selected time slot is not available' });
    }
    
    // Create booking
    const [result] = await db.execute(
      'INSERT INTO bookings (client_id, pro_id, service_id, package_id, date, start_time, end_time, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [client_id, pro_id, service_id, package_id, date, start_time, end_time, price]
    );
    
    // Mark availability as booked
    await db.execute(
      'UPDATE availability SET is_booked = 1 WHERE pro_id = ? AND date = ? AND start_time <= ? AND end_time >= ?',
      [pro_id, date, start_time, end_time]
    );
    
    // Get created booking
    const [bookingRows] = await db.execute(
      'SELECT * FROM bookings WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(bookingRows[0]);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Server error while creating booking' });
  }
};

const acceptBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const pro_id = req.user.id;
    
    // Check if booking exists and belongs to this pro
    const [bookingRows] = await db.execute(
      'SELECT * FROM bookings WHERE id = ? AND pro_id = ?',
      [id, pro_id]
    );
    
    if (bookingRows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    const booking = bookingRows[0];
    
    if (booking.status !== 'pending') {
      return res.status(400).json({ error: 'Booking is not in pending status' });
    }
    
    // Update booking status
    await db.execute(
      'UPDATE bookings SET status = ? WHERE id = ?',
      ['confirmed', id]
    );
    
    res.json({ message: 'Booking accepted successfully' });
  } catch (error) {
    console.error('Error accepting booking:', error);
    res.status(500).json({ error: 'Server error while accepting booking' });
  }
};

const rejectBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const pro_id = req.user.id;
    
    // Check if booking exists and belongs to this pro
    const [bookingRows] = await db.execute(
      'SELECT * FROM bookings WHERE id = ? AND pro_id = ?',
      [id, pro_id]
    );
    
    if (bookingRows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    const booking = bookingRows[0];
    
    if (booking.status !== 'pending') {
      return res.status(400).json({ error: 'Booking is not in pending status' });
    }
    
    // Update booking status
    await db.execute(
      'UPDATE bookings SET status = ? WHERE id = ?',
      ['rejected', id]
    );
    
    // Free up the availability slot
    await db.execute(
      'UPDATE availability SET is_booked = 0 WHERE pro_id = ? AND date = ? AND start_time = ? AND end_time = ?',
      [pro_id, booking.date, booking.start_time, booking.end_time]
    );
    
    res.json({ message: 'Booking rejected successfully' });
  } catch (error) {
    console.error('Error rejecting booking:', error);
    res.status(500).json({ error: 'Server error while rejecting booking' });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const user_id = req.user.id;
    const user_role = req.user.role;
    
    let query, params;
    
    if (user_role === 'client') {
      query = 'SELECT * FROM bookings WHERE client_id = ? ORDER BY created_at DESC';
      params = [user_id];
    } else if (user_role === 'pro') {
      query = 'SELECT * FROM bookings WHERE pro_id = ? ORDER BY created_at DESC';
      params = [user_id];
    } else {
      return res.status(400).json({ error: 'Invalid user role' });
    }
    
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Server error while fetching bookings' });
  }
};

module.exports = {
  createBooking,
  acceptBooking,
  rejectBooking,
  getUserBookings
};