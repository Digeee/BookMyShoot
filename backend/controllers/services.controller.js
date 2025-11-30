const db = require('../config/database');

const getServices = async (req, res) => {
  try {
    const { category, location, date, minPrice, maxPrice, rating } = req.query;
    
    let query = `
      SELECT s.*, p.business_name, p.avg_rating 
      FROM services s 
      JOIN profiles p ON s.pro_id = p.user_id 
      WHERE s.is_active = 1
    `;
    
    const params = [];
    
    if (category) {
      query += ' AND s.category = ?';
      params.push(category);
    }
    
    if (location) {
      query += ' AND (p.location_city LIKE ? OR p.location_area LIKE ?)';
      params.push(`%${location}%`);
      params.push(`%${location}%`);
    }
    
    if (minPrice) {
      query += ' AND s.base_price >= ?';
      params.push(minPrice);
    }
    
    if (maxPrice) {
      query += ' AND s.base_price <= ?';
      params.push(maxPrice);
    }
    
    if (rating) {
      query += ' AND p.avg_rating >= ?';
      params.push(rating);
    }
    
    query += ' ORDER BY p.avg_rating DESC';
    
    const [rows] = await db.execute(query, params);
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Server error while fetching services' });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get service details
    const [serviceRows] = await db.execute(`
      SELECT s.*, p.business_name, p.bio, p.location_city, p.location_area, p.avg_rating
      FROM services s
      JOIN profiles p ON s.pro_id = p.user_id
      WHERE s.id = ? AND s.is_active = 1
    `, [id]);
    
    if (serviceRows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    const service = serviceRows[0];
    
    // Get packages for this service
    const [packageRows] = await db.execute(
      'SELECT * FROM packages WHERE service_id = ?',
      [id]
    );
    
    service.packages = packageRows;
    
    // Get availability for this service
    const [availabilityRows] = await db.execute(
      'SELECT * FROM availability WHERE pro_id = ? AND date >= CURDATE() AND is_booked = 0 ORDER BY date',
      [service.pro_id]
    );
    
    service.availability = availabilityRows;
    
    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Server error while fetching service' });
  }
};

module.exports = {
  getServices,
  getServiceById
};