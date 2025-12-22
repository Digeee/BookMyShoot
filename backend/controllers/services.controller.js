const db = require('../config/database');
const { catchAsync, NotFoundError } = require('../utils/errorHandler');
const { logInfo, logError } = require('../utils/logger');
const { paginateQuery, sanitizeSearchInput } = require('../utils/dbUtils');

const getServices = catchAsync(async (req, res) => {
  const { category, location, date, minPrice, maxPrice, rating, page, limit } = req.query;
  
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
    // Sanitize location input to prevent SQL injection
    const sanitizedLocation = sanitizeSearchInput(location);
    query += ' AND (p.location_city LIKE ? OR p.location_area LIKE ?)';
    params.push(`%${sanitizedLocation}%`);
    params.push(`%${sanitizedLocation}%`);
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
  
  const result = await paginateQuery(query, params, page, limit);
  
  logInfo('Services fetched', { 
    filters: { category, location, minPrice, maxPrice, rating },
    pagination: { page, limit }
  });
  
  res.json({
    success: true,
    data: result.data,
    pagination: result.pagination
  });
});

const getServiceById = catchAsync(async (req, res) => {
  const { id } = req.params;
  
  // Get service details
  const [serviceRows] = await db.execute(`
    SELECT s.*, p.business_name, p.bio, p.location_city, p.location_area, p.avg_rating
    FROM services s
    JOIN profiles p ON s.pro_id = p.user_id
    WHERE s.id = ? AND s.is_active = 1
  `, [id]);
  
  if (serviceRows.length === 0) {
    throw new NotFoundError('Service not found');
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
  
  logInfo('Service fetched by ID', { serviceId: id });
  
  res.json({
    success: true,
    data: service
  });
});

module.exports = {
  getServices,
  getServiceById
};