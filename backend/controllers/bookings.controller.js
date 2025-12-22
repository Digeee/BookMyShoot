const db = require('../config/database');
const { executeQuery, executeTransaction, paginateQuery } = require('../utils/dbUtils');
const { catchAsync, NotFoundError, ConflictError, ValidationError } = require('../utils/errorHandler');
const { logInfo, logError } = require('../utils/logger');

const createBooking = catchAsync(async (req, res) => {
  const { service_id, package_id, date, start_time, end_time } = req.body;
  const client_id = req.user.id;
  
  // Validate service exists and is active
  const [serviceRows] = await db.execute(
    'SELECT pro_id, base_price FROM services WHERE id = ? AND is_active = 1',
    [service_id]
  );
  
  if (serviceRows.length === 0) {
    throw new NotFoundError('Service not found or inactive');
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
      throw new NotFoundError('Package not found');
    }
    
    price = packageRows[0].price;
  }
  
  // Check if slot is available
  const [availabilityRows] = await db.execute(
    'SELECT id FROM availability WHERE pro_id = ? AND date = ? AND start_time <= ? AND end_time >= ? AND is_booked = 0',
    [pro_id, date, start_time, end_time]
  );
  
  if (availabilityRows.length === 0) {
    throw new ConflictError('Selected time slot is not available');
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
  
  logInfo('Booking created successfully', { bookingId: result.insertId, clientId: client_id, proId: pro_id });
  
  res.status(201).json({
    success: true,
    data: bookingRows[0]
  });
});

const acceptBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const pro_id = req.user.id;
  
  // Check if booking exists and belongs to this pro
  const [bookingRows] = await db.execute(
    'SELECT * FROM bookings WHERE id = ? AND pro_id = ?',
    [id, pro_id]
  );
  
  if (bookingRows.length === 0) {
    throw new NotFoundError('Booking not found');
  }
  
  const booking = bookingRows[0];
  
  if (booking.status !== 'pending') {
    throw new ValidationError('Booking is not in pending status');
  }
  
  // Update booking status
  await db.execute(
    'UPDATE bookings SET status = ? WHERE id = ?',
    ['confirmed', id]
  );
  
  logInfo('Booking accepted', { bookingId: id, proId: pro_id });
  
  res.json({ 
    success: true,
    message: 'Booking accepted successfully' 
  });
});

const rejectBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const pro_id = req.user.id;
  
  // Check if booking exists and belongs to this pro
  const [bookingRows] = await db.execute(
    'SELECT * FROM bookings WHERE id = ? AND pro_id = ?',
    [id, pro_id]
  );
  
  if (bookingRows.length === 0) {
    throw new NotFoundError('Booking not found');
  }
  
  const booking = bookingRows[0];
  
  if (booking.status !== 'pending') {
    throw new ValidationError('Booking is not in pending status');
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
  
  logInfo('Booking rejected', { bookingId: id, proId: pro_id });
  
  res.json({ 
    success: true,
    message: 'Booking rejected successfully' 
  });
});

const getUserBookings = catchAsync(async (req, res) => {
  const user_id = req.user.id;
  const user_role = req.user.role;
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  
  let query, params;
  
  if (user_role === 'client') {
    query = 'SELECT * FROM bookings WHERE client_id = ? ORDER BY created_at DESC';
    params = [user_id];
  } else if (user_role === 'pro') {
    query = 'SELECT * FROM bookings WHERE pro_id = ? ORDER BY created_at DESC';
    params = [user_id];
  } else {
    throw new ValidationError('Invalid user role');
  }
  
  const result = await paginateQuery(query, params, page, limit);
  
  logInfo('User bookings fetched', { userId: user_id, role: user_role, page, limit });
  
  res.json({
    success: true,
    data: result.data,
    pagination: result.pagination
  });
});

module.exports = {
  createBooking,
  acceptBooking,
  rejectBooking,
  getUserBookings
};