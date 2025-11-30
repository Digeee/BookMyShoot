const db = require('../config/database');

const getUsers = async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT id, name, email, phone, role, created_at FROM users ORDER BY created_at DESC'
    );
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error while fetching users' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Prevent admin from deleting themselves
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ error: 'You cannot delete yourself' });
    }
    
    // Check if user exists
    const [userRows] = await db.execute(
      'SELECT id FROM users WHERE id = ?',
      [id]
    );
    
    if (userRows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Delete user (cascades to related tables)
    await db.execute(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Server error while deleting user' });
  }
};

const getStats = async (req, res) => {
  try {
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
    
    res.json({
      users: userCount[0].count,
      professionals: proCount[0].count,
      clients: clientCount[0].count,
      bookings: bookingCount[0].count,
      revenue: revenue[0].total || 0
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Server error while fetching statistics' });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  getStats
};