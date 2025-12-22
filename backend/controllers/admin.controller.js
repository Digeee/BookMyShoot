const db = require('../config/database');
const { catchAsync, ValidationError, NotFoundError } = require('../utils/errorHandler');
const { logInfo, logError } = require('../utils/logger');
const { paginateQuery } = require('../utils/dbUtils');

const getUsers = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  
  const query = 'SELECT id, name, email, phone, role, created_at FROM users ORDER BY created_at DESC';
  const result = await paginateQuery(query, [], page, limit);
  
  logInfo('Admin fetched users list', { adminId: req.user.id });
  
  res.json({
    success: true,
    data: result.data,
    pagination: result.pagination
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  
  // Prevent admin from deleting themselves
  if (parseInt(id) === req.user.id) {
    throw new ValidationError('You cannot delete yourself');
  }
  
  // Check if user exists
  const [userRows] = await db.execute(
    'SELECT id FROM users WHERE id = ?',
    [id]
  );
  
  if (userRows.length === 0) {
    throw new NotFoundError('User not found');
  }
  
  // Delete user (cascades to related tables)
  await db.execute(
    'DELETE FROM users WHERE id = ?',
    [id]
  );
  
  logInfo('Admin deleted user', { adminId: req.user.id, deletedUserId: id });
  
  res.json({ 
    success: true,
    message: 'User deleted successfully' 
  });
});

const getStats = catchAsync(async (req, res) => {
  // Get total users
  const [userCount] = await db.execute('SELECT COUNT(*) as count FROM users');
  
  // Get total professionals
  const [proCount] = await db.execute('SELECT COUNT(*) as count FROM users WHERE role = "pro"');
  
  // Get total clients
  const [clientCount] = await db.execute('SELECT COUNT(*) as count FROM users WHERE role = "client"');
  
  // Get total bookings
  const [bookingCount] = await db.execute('SELECT COUNT(*) as count FROM bookings');
  
  // Get total revenue
  const [revenue] = await db.execute('SELECT SUM(total_price) as total FROM bookings WHERE status = "completed"');
  
  const stats = {
    users: userCount[0].count,
    professionals: proCount[0].count,
    clients: clientCount[0].count,
    bookings: bookingCount[0].count,
    revenue: revenue[0].total || 0
  };
  
  logInfo('Admin fetched statistics', { adminId: req.user.id });
  
  res.json({
    success: true,
    data: stats
  });
});

module.exports = {
  getUsers,
  deleteUser,
  getStats
};