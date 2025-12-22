/**
 * Logger utility for application logging
 */

const winston = require('winston');
const path = require('path');

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    let logMessage = `${timestamp} [${level.toUpperCase()}]: ${message}`;
    if (stack) {
      logMessage += `\nStack: ${stack}`;
    }
    return logMessage;
  })
);

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [
    // Write all logs with level `info` and below to `combined.log`
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    
    // Write all logs with level `error` and below to `error.log`
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});

// If we're not in production, also log to the console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      logFormat
    )
  }));
}

// Helper functions for different log levels
const logInfo = (message, meta = {}) => {
  logger.info(message, meta);
};

const logError = (message, error = null, meta = {}) => {
  if (error && error.stack) {
    logger.error(message, { ...meta, stack: error.stack });
  } else {
    logger.error(message, meta);
  }
};

const logWarn = (message, meta = {}) => {
  logger.warn(message, meta);
};

const logDebug = (message, meta = {}) => {
  logger.debug(message, meta);
};

module.exports = {
  logger,
  logInfo,
  logError,
  logWarn,
  logDebug
};