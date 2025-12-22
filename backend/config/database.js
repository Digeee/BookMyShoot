const mysql = require('mysql2/promise');
const { logInfo, logError } = require('../utils/logger');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'bookmyshoot',
  waitForConnections: true,
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 20,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  charset: 'utf8mb4',
  timezone: '+05:30', // Sri Lanka timezone
  trace: true,
  multipleStatements: false, // Security measure
  dateStrings: false,
  bigNumberStrings: true,
  supportBigNumbers: true
};

const pool = mysql.createPool(dbConfig);

// Test database connection
pool.getConnection()
  .then(connection => {
    logInfo('Database connection established successfully');
    connection.release();
  })
  .catch(error => {
    logError('Failed to establish database connection', error);
    process.exit(1);
  });

// Log pool events
pool.on('connection', (connection) => {
  logInfo('New database connection established', { threadId: connection.threadId });
});

pool.on('acquire', (connection) => {
  logDebug('Database connection acquired', { threadId: connection.threadId });
});

pool.on('release', (connection) => {
  logDebug('Database connection released', { threadId: connection.threadId });
});

pool.on('enqueue', () => {
  logWarn('Database connection queue is full, waiting for available connection');
});

module.exports = pool;