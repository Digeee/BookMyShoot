/**
 * Database utility functions for query optimization and performance
 */

const pool = require('../config/database');
const { logInfo, logError, logDebug } = require('./logger');

/**
 * Execute a database query with performance monitoring
 * @param {string} query - SQL query string
 * @param {Array} params - Query parameters
 * @param {string} queryName - Name for logging purposes
 * @returns {Promise<Array>} Query results
 */
const executeQuery = async (query, params = [], queryName = 'unnamed') => {
  const startTime = Date.now();
  
  try {
    logDebug(`Executing query: ${queryName}`, { query, params });
    const [results] = await pool.execute(query, params);
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    logInfo(`Query executed successfully: ${queryName}`, { 
      duration: `${duration}ms`, 
      rowCount: Array.isArray(results) ? results.length : 1 
    });
    
    return results;
  } catch (error) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    logError(`Query failed: ${queryName}`, error, { 
      duration: `${duration}ms`,
      query,
      params
    });
    
    throw error;
  }
};

/**
 * Execute multiple queries in a transaction
 * @param {Function} transactionFn - Function that takes a connection and executes queries
 * @returns {Promise<any>} Transaction result
 */
const executeTransaction = async (transactionFn) => {
  const connection = await pool.getConnection();
  const startTime = Date.now();
  
  try {
    await connection.beginTransaction();
    logDebug('Transaction started');
    
    const result = await transactionFn(connection);
    
    await connection.commit();
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    logInfo('Transaction committed successfully', { duration: `${duration}ms` });
    return result;
  } catch (error) {
    await connection.rollback();
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    logError('Transaction rolled back due to error', error, { duration: `${duration}ms` });
    throw error;
  } finally {
    connection.release();
  }
};

/**
 * Paginate database results
 * @param {string} query - Base query without LIMIT clause
 * @param {Array} params - Query parameters
 * @param {number} page - Page number (1-based)
 * @param {number} limit - Number of records per page
 * @returns {Promise<Object>} Paginated results
 */
const paginateQuery = async (query, params = [], page = 1, limit = 10) => {
  // Ensure page and limit are valid numbers
  page = Math.max(1, parseInt(page) || 1);
  limit = Math.max(1, Math.min(100, parseInt(limit) || 10)); // Max 100 per page
  
  const offset = (page - 1) * limit;
  
  // Get total count
  const countQuery = `SELECT COUNT(*) as total FROM (${query}) as count_table`;
  const [countResult] = await executeQuery(countQuery, params, 'pagination_count');
  const total = countResult[0].total;
  
  // Get paginated results
  const paginatedQuery = `${query} LIMIT ? OFFSET ?`;
  const paginatedParams = [...params, limit, offset];
  const results = await executeQuery(paginatedQuery, paginatedParams, 'pagination_results');
  
  return {
    data: results,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    }
  };
};

/**
 * Sanitize search input to prevent SQL injection in LIKE queries
 * @param {string} input - User input to sanitize
 * @returns {string} Sanitized input
 */
const sanitizeSearchInput = (input) => {
  if (typeof input !== 'string') return '';
  
  // Remove dangerous characters but preserve wildcards for legitimate use
  return input.replace(/[%_]/g, '\\$&'); // Escape SQL wildcards
};

module.exports = {
  executeQuery,
  executeTransaction,
  paginateQuery,
  sanitizeSearchInput
};