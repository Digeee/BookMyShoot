const db = require('../config/database');

const getAvailability = async (req, res) => {
  try {
    const { pro_id } = req.query;
    
    if (!pro_id) {
      return res.status(400).json({ error: 'Professional ID is required' });
    }
    
    const [rows] = await db.execute(
      'SELECT * FROM availability WHERE pro_id = ? AND date >= CURDATE() ORDER BY date, start_time',
      [pro_id]
    );
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ error: 'Server error while fetching availability' });
  }
};

const addAvailability = async (req, res) => {
  try {
    const { pro_id, date, start_time, end_time } = req.body;
    
    // Check for overlapping availability
    const [existingRows] = await db.execute(
      'SELECT id FROM availability WHERE pro_id = ? AND date = ? AND ((start_time < ? AND end_time > ?) OR (start_time < ? AND end_time > ?))',
      [pro_id, date, end_time, start_time, start_time, end_time]
    );
    
    if (existingRows.length > 0) {
      return res.status(409).json({ error: 'Overlapping availability slot already exists' });
    }
    
    const [result] = await db.execute(
      'INSERT INTO availability (pro_id, date, start_time, end_time) VALUES (?, ?, ?, ?)',
      [pro_id, date, start_time, end_time]
    );
    
    const [rows] = await db.execute(
      'SELECT * FROM availability WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error adding availability:', error);
    res.status(500).json({ error: 'Server error while adding availability' });
  }
};

const deleteAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if the slot is already booked
    const [availabilityRows] = await db.execute(
      'SELECT is_booked FROM availability WHERE id = ?',
      [id]
    );
    
    if (availabilityRows.length === 0) {
      return res.status(404).json({ error: 'Availability slot not found' });
    }
    
    if (availabilityRows[0].is_booked) {
      return res.status(400).json({ error: 'Cannot delete booked availability slot' });
    }
    
    // Delete availability slot
    await db.execute(
      'DELETE FROM availability WHERE id = ?',
      [id]
    );
    
    res.json({ message: 'Availability slot deleted successfully' });
  } catch (error) {
    console.error('Error deleting availability:', error);
    res.status(500).json({ error: 'Server error while deleting availability' });
  }
};

module.exports = {
  getAvailability,
  addAvailability,
  deleteAvailability
};